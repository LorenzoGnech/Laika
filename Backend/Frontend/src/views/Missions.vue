<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
    <div class="sectiontitle">
       <h1 id="maintitle" ref="maintitle">Missions</h1>
       <div class="blueline"></div>
       <img @click="handleFilter" src="@/assets/filter.png" class="filter">
    </div>
    <div v-if="filterActive" class="filters"> 
      <div style="flex:2 1 auto;">  
        <p class="ordertext">Filter by common tags:</p>
        <input type="checkbox" name="tag1" value="NASA" v-model="check1">
        <label for="tag1" class="tag">NASA</label>
        <input type="checkbox" name="tag2" value="SpaceX" v-model="check2">
        <label for="tag2" class="tag">SpaceX</label>
        <input type="checkbox"  name="tag3" value="ESA" v-model="check3">
        <label for="tag3" class="tag">ESA</label>
      </div>
      <div style="flex:1 1 auto; padding-top:2vh;">
      <input class="filtertags" style="text-align:center;" placeholder="What are you looking for?" name="filtertext" v-model="query">
      </div>
      <div style="flex:4 1 auto;">
        <div style="float:left; display:inline-block; width: 100%;">
          <p class="ordertext">Order by date:</p>
          <div class="fbutton r" id="fbutton">
            <input @click="invertOrder" type="checkbox" class="checkbox">
            <div class="knobs"></div>
            <div class="layer"></div>
          </div>
        </div>
      </div>
      <div style="flex: 1 1 auto;">
        <a @click=removeFilters id="removefilters">Remove filters</a>
      </div>
    </div>
    <div class="container" ref="gridcontainer">
       <HCardGrid :cards=cMissions :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="mission"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavMenu from '../components/NavMenu.vue';
import HCardGrid from '../components/HCardGrid.vue'

export default {
  name: 'Missions',
  components: {
    NavMenu,
    HCardGrid
  },
  data: function(){
    return {
      cMissions: [],
      missions: [],
      filterActive: false,
      invert: false,
      check1: false,
      check2: false,
      check3: false,
      query: "",
    }
  },
  watch: {
    check1: function(){
      if(this.check1){
        this.keepElementWithTag("nasa");
      }
    },
    check2: function(){
      if(this.check2){
        this.keepElementWithTag("spacex");
      }
    },
    check3: function(){
      if(this.check3){
        this.keepElementWithTag("esa");
      }
    },
    query: function(){
      if(this.query != ""){
        this.searchQuery(this.query);
      }
    },
  },
  mounted(){
    this.getMissions();

  },
  computed: {
    getCardsHeight(){
      return window.innerHeight/3.5;
    },
    getCardsWidth(){
      return window.innerWidth/1.3;
    }
  },
  methods: {
    async getMissions(){
      axios
        .get('https://laikapp.herokuapp.com/api/v1/missions/')
        .then(response => {
          this.missions = response.data;
          this.computeMissions();
          this.checkPlanet();
        });
    },
    computeMissions(){
      this.missions.forEach( (item, index) => {
        var t = {
          id: item._id,
          header: item.title,
          date: item.date,
          content: item.description.slice(0, 100) + "...",
          fullContent: item.description,
          img: item.img_path[0],
          source: item.source_url,
          tags: item.tags,
        };
      this.cMissions.push(t)
      });
    },
    handleFilter(){
      this.filterActive = !this.filterActive;
    },
      invertOrder(){
      this.cMissions.reverse();
    },
    keepElementWithTag(t){
      let helper = this.cMissions;
      this.cMissions = [];
      for(let i = 0; i<helper.length; i++){
        if(helper[i].tags.includes(t)){
          this.cMissions.push(helper[i]);
        }
      }
    },
    searchQuery(q){
      let helper = this.cMissions;
      this.cMissions = [];
      for(let i = 0; i<helper.length; i++){
        if(helper[i].header.includes(q)){
          this.cMissions.push(helper[i]);
        } else if(helper[i].fullContent.includes(q)){
          this.cMissions.push(helper[i]);
        }
      }
    },
    removeFilters(){
      this.check1 = false;
      this.check2 = false;
      this.check3 = false;
      this.query = "";
      this.cMissions = [];
      this.computeMissions();
    },
    checkPlanet(){
      let planet = this.$route.params.value;
      if(planet == "mercury" || planet == "venus" || planet == "neptune" || planet == "earth" || planet == "mars" || planet == "jupyter" || planet == "saturn" || planet == "uranus" || planet == "pluto"){
        this.keepElementWithTag(planet);
        this.$refs.maintitle.textContent = "Missions (" + planet + ")";
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.filter{
  width: 40px;
  margin-bottom: 1vh;
}

#maintitle{
  color: whitesmoke;
  font-size: 35px;
}

.sectiontitle{
  padding-top: 5vh;
  align-items: center;
  justify-content: center;
  height: 15vh;
  display:flex;
}

.blueline{
    margin-left: 1%;
    margin-right: 1%;
    width: 70%;
    height: 25px;
    background-color: transparent;
    border-bottom: solid #00ffff 3px ;
}

.container{
  width: 80%;
  margin: auto;
  padding-top: 0;
}

</style>
