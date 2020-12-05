<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
    <div class="sectiontitle">
       <h1 id="maintitle">Astronauts</h1>
       <div class="blueline"></div>
       <img src="@/assets/filter.png" class="filter">
    </div>
    <div class="container" ref="gridcontainer">
       <HCardGrid :cards=computedAstronauts :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="astronauts"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavMenu from '../components/NavMenu.vue';
import HCardGrid from '../components/HCardGrid.vue'

export default {
  name: 'Astronauts',
  components: {
    NavMenu,
    HCardGrid
  },
  data: function(){
    return {
      cAstronauts: [],
      astronauts: [],
    }
  },
  mounted(){
    this.getAstronauts();
  },
  computed: {
    computedAstronauts(){
      this.astronauts.forEach( (item, index) => {
        var t = {
          id: item.id,
          header: item.name,
          date: item.birth,
          content: item.nationality,
          fullContent: item.name,
          img: item.img,
          source: item.agency,
          tags: [],
        };
       this.cAstronauts.push(t)
      });
      return this.cAstronauts;
    },
    getCardsHeight(){
      return window.innerHeight/3.5;
    },
    getCardsWidth(){
      return window.innerWidth/1.3;
    }
  },
  methods: {
    async getAstronauts(){
      axios
        .get('https://laikapp.herokuapp.com/api/v1/astronauts/')
        .then(response => (this.astronauts = response.data));
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
