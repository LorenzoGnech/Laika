<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
    <div class="blueline"></div>
    <div class="container">
        <div class="newsTitle" :style="bgImage">
            <h1 class="newsH1">{{news.title}}</h1>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavMenu from '../components/NavMenu.vue'

export default {
  name: 'News',
  components: {
    NavMenu
  },
  data: function(){
    return {
        news: {}
    }
  },
mounted(){
    var newsNumber = parseInt(this.$route.params.value);
    if(Number.isInteger(newsNumber)){
        let url = 'https://laikapp.herokuapp.com/api/v1/news/' + newsNumber;
        axios
            .get(url)
            .then(response => (this.news = response.data));
    }
  },
  computed:{
    bgImage() {
      if(this.news.img == ""){
        return {
          backgroundImage: `url(https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2120&q=80)`
        }
      }
      return {
        backgroundImage: `url(${this.news.img})`
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.newsH1{
    white-space: nowrap;
    font-size: 2vw;
    color: white;
    margin: 0 auto;
    line-height: 650px;
    text-shadow: 2px 2px black;
}

.blueline{
    
    width: 100%;
    height: 10px;
    background-color: black;
}

.newsTitle{
  width: 80%;
  height: 650px;
  background-size: cover;
}

</style>
