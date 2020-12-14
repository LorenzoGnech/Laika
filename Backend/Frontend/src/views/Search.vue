<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
    <div class="container">
      <div class="container containertitle-link" id="latestnews" ref="latestnews">
        <h2 class="containertitle" @click="handleClick('LatestNews')">NEWS</h2>
        <div v-if="news">
          <CardGrid :cards=computedNews :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="news"/>
        </div>
        <div v-else>
          <h2 class="containertitle" @click="handleClick('LatestNews')">NOTHING TO SHOW</h2>
        </div>
      </div>
      <div class="container containertitle-link" id="latestmissions" ref="latestmissions">
        <h2 class="containertitle" @click="handleClick('missions')">MISSIONS</h2>
        <div v-if="missions">
          <CardGrid :cards=computedMissions :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="mission"/>
        </div>
        <div v-else>
          <h2 class="containertitle" @click="handleClick('LatestNews')">NOTHING TO SHOW</h2>
        </div>
      </div>
      <div class="container containertitle-link" id="latesttelescopes" ref="latesttelescopes">
        <h2 class="containertitle" @click="handleClick('telescopes')">TELESCOPES</h2>
        <div v-if="telescopes">
          <CardGrid :cards=computedTelescopes :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="telescope"/>
        </div>
        <div v-else>
          <h2 class="containertitle" @click="handleClick('LatestNews')">NOTHING TO SHOW</h2>
        </div>
      </div>
      <div class="container containertitle-link" id="latestexoplanets" ref="latestexoplanets">
        <h2 class="containertitle" @click="handleClick('exoplanets')">EXOPLANETS</h2>
        <div v-if="exoplanets">
          <CardGrid :cards=computedExoplanets :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="exoplanet"/>
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
    }
  },
  mounted(){
    this.getSearchResults();
  },
  methods: {
    async getSearchResults(){
      var aa = 'https://laikapp.herokuapp.com/api/v1' + this.$router.currentRoute.path
      axios
        .get(aa)
        .then(response => (this.result = response.data));
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
  padding: 40px 80px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
