<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
    <div class="container">
          <h1 style="color: white">Work in progress...</h1>
    </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
import axios from 'axios'

export default {
  name: 'Search',
  components: {
    NavMenu
  },
  data: function(){
    return {
      result: [],
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
</style>
