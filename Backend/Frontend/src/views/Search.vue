<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
    <div class="container">
      <div class="container containertitle-link" id="latestnews" ref="latestnews">
        <h2 class="containertitle" @click="handleClick('LatestNews')">NEWS</h2>
        <div v-if="news">
          <CardGrid :cards=news_list :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="news"/>
        </div>
        <div v-else>
          <h2 class="containertitle" @click="handleClick('LatestNews')">NOTHING TO SHOW</h2>
        </div>
      </div>
      <div class="container containertitle-link" id="astronauts" ref="astronauts">
        <h2 class="containertitle" @click="handleClick('astronauts')">ASTRONAUTS</h2>
        <div v-if="astronauts">
          <CardGrid :cards=astronauts_list :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="astronaut"/>
        </div>
        <div v-else>
          <h2 class="containertitle" @click="handleClick('LatestNews')">NOTHING TO SHOW</h2>
        </div>
      </div>
      <div class="container containertitle-link" id="latestmissions" ref="latestmissions">
        <h2 class="containertitle" @click="handleClick('missions')">MISSIONS</h2>
        <div v-if="missions">
          <CardGrid :cards=mission_list :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="mission"/>
        </div>
        <div v-else>
          <h2 class="containertitle" @click="handleClick('LatestNews')">NOTHING TO SHOW</h2>
        </div>
      </div>
      <div class="container containertitle-link" id="latesttelescopes" ref="latesttelescopes">
        <h2 class="containertitle" @click="handleClick('telescopes')">TELESCOPES</h2>
        <div v-if="telescopes">
          <CardGrid :cards=telescopes_list :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="telescope"/>
        </div>
        <div v-else>
          <h2 class="containertitle" @click="handleClick('LatestNews')">NOTHING TO SHOW</h2>
        </div>
      </div>
      <div class="container containertitle-link" id="latestexoplanets" ref="latestexoplanets">
        <h2 class="containertitle" @click="handleClick('exoplanets')">EXOPLANETS</h2>
        <div v-if="exoplanets">
          <CardGrid :cards=exoplanets_list :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="exoplanet"/>
        </div>
        <div v-else>
          <h2 class="containertitle" @click="handleClick('LatestNews')">NOTHING TO SHOW</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import CardGrid from '../components/CardGrid.vue'
import axios from 'axios'

export default {
  name: 'Search',
  components: {
    CardGrid,
    NavMenu
  },
  data: function(){
    return {
      result: [],
      news: false,
      missions: false,
      telescopes: false,
      exoplanets: false,
      astronauts: false,
      mission_list: [],
      news_list: [],
      telescopes_list: [],
      exoplanets_list: [],
      astronauts_list: [],
    }
  },
  mounted(){
    this.getSearchMissions();
    this.getSearchNews();
    this.getSearchTelescopes();
    this.getSearchExoplanets();
    this.getSearchAstronauts();
  },
  computed: {
    getCardsHeight(){
      return window.innerHeight/2.1;
    },
    getCardsWidth(){
      return window.innerWidth/6.4;
    }
  },
  methods: {
    handleClick(link){
      //let url="/#/" + link;
      //let url = document.location.origin + "/#/" + link;
      this.$router.push("/" + link);
    },
    computedMissions(data){
      data.forEach( (item, index) => {
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
       this.mission_list.push(t)
      });
    },
    getSearchMissions(){
      var a = this.$router.currentRoute.path.split("/");
      var aa = 'https://laikapp.herokuapp.com/api/v1/' + a[1] + "/missions/" + a[2]
      axios
        .get(aa)
        .then(response => {
          if (response.data.length > 0){
            this.missions = true;
            this.computedMissions(response.data);
          }
        });
    },
    computedNews(data){
      data.forEach( (item, index) => {
        var t = {
          id: item._id,
          header: item.title,
          date: item.date,
          content: item.content.slice(0, 100) + "...",
          fullContent: item.content,
          img: item.img_path,
          source: item.source_url,
          tags: item.tags,
        };
       this.news_list.push(t)
      });
    },
    getSearchNews(){
      var a = this.$router.currentRoute.path.split("/");
      var aa = 'https://laikapp.herokuapp.com/api/v1/' + a[1] + "/news/" + a[2]
      axios
        .get(aa)
        .then(response => {
          if (response.data.length > 0){
            this.news = true;
            this.computedNews(response.data)
          }
        });
    },
    computedTelescopes(data){
      data.forEach( (item, index) => {
        if(item.img != undefined && item.img.length == 0){
          item.img.push("");
        }
        var t = {
          id: item._id,
          header: item.name,
          date: item.launch_date,
          content: item.description.slice(0, 100) + "...",
          fullContent: item.description,
          img: item.img_path[0],
          source: item.source_url,
          tags: item.tags,
        };
       this.telescopes_list.push(t)
      });
    },
    getSearchTelescopes(){
      var a = this.$router.currentRoute.path.split("/");
      var aa = 'https://laikapp.herokuapp.com/api/v1/' + a[1] + "/telescopes/" + a[2]
      axios
        .get(aa)
        .then(response => {
          if (response.data.length > 0){
            this.telescopes = true;
            this.computedTelescopes(response.data)
          }
        });
    },
    computedAstronauts(data){
      data.forEach( (item, index) => {
        var t = {
          id: item._id,
          header: item.name,
          date: item.birth,
          content: item.nationality,
          fullContent: item.name,
          img: item.img_path[0],
          source: item.agency,
          tags: item.tags,
        };
       this.astronauts_list.push(t)
      });
    },
    getSearchAstronauts(){
      var a = this.$router.currentRoute.path.split("/");
      var aa = 'https://laikapp.herokuapp.com/api/v1/' + a[1] + "/astronauts/" + a[2]
      axios
        .get(aa)
        .then(response => {
          if (response.data.length > 0){
            this.astronauts = true;
            this.computedAstronauts(response.data)
          }
        });
    },
    computedExoplanets(data){
      data.forEach( (item, index) => {
        var t = {
          id: item._id,
          header: item.name,
          date: item.discover_date,
          content: item.description.slice(0, 100) + "...",
          fullContent: item.description,
          img: item.img_path,
          source: item.source_url,
          tags: item.tags,
        };
       this.exoplanets_list.push(t)
      });
    },
    getSearchExoplanets(){
      var a = this.$router.currentRoute.path.split("/");
      var aa = 'https://laikapp.herokuapp.com/api/v1/' + a[1] + "/exoplanets/" + a[2]
      axios
        .get(aa)
        .then(response => {
          if (response.data.length > 0){
            this.exoplanets = true;
            this.computedExoplanets(response.data)
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(//db.onlinewebfonts.com/c/00370d92f1b404768d34ac7dc664289e?family=Sansation);

.containertitle{
  letter-spacing: 3px;
  color: whitesmoke;
  font-size: 30px;
  padding-top: 6px;
  padding-bottom: 6px;
  width: 100%;
}

.container {
  margin-top: 4vh;
  margin-right: 10vh;
  margin-left: 10vh;
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
