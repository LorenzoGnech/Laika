<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
    <div class="header">
        <div class="blueline"></div>
        <div class="newsTitle" :style="bgImage">
            <h1 class="newsH1">{{mission.title}}</h1>
        </div>
        <div class="blueline"></div>
    </div>
    <div class="container">
        <pre class="newsContent">{{mission.description}}</pre>
        <div class="newsFooter">
            <p class="footerText">Date: {{mission.date}} </p>
            <p class="footerText">Source: {{mission.source_url}}</p>
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
        mission: {}
    }
  },
mounted(){
    var missionNumber = this.$route.params.value;
    let url = 'https://laikapp.herokuapp.com/api/v1/missions/' + missionNumber;
    axios
        .get(url)
        .then(response => (this.mission = response.data));
    },
  computed:{
    bgImage() {
      if(this.mission.img_path == undefined){
        return {
          backgroundImage: `url(https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2120&q=80)`
        }
      }
      return {
        backgroundImage: `url(${this.mission.img_path})`
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
    height: 2px;
    background-color: #00ffff;
}

.newsTitle{
  top: 40%;
  margin: 0 auto;
  width: 80%;
  height: 650px;
  background-size: cover;
}

.header{
    padding-top: 5%;
    width: 100%;
}

.container{
    margin: 0 auto;
    width: 80%;
    text-align: justify;
    text-justify: inter-word;
}

.newsContent{
    color: white;
    font-size: 1vw;
    white-space:pre-line;
}

.newsFooter{
    text-align: center;
    float: right;
    color: lightblue;
    font-size: 0.7vw;
}

</style>
