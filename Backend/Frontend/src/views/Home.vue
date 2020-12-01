<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
          <div class="solar_div">
            <div class="system_div">
              <ul id="pianeti">
                <li id="mercury_li" class="new_li">
                  <router-link to="/missions">
                  <img class="image" src="@/assets/solarsystem/1.jpg"/>
                  <p id="mercury" class="planets">MERCURY</p>
                  </router-link>
                </li> 
                <li id="venus_li" class="new_li"><router-link to="/missions"><img class="image" src="@/assets/solarsystem/2.jpg"/><p id="venus" class="planets">VENUS</p></router-link></li>
                <li id="earth_li" class="new_li"><router-link to="/missions"><img class="image" src="@/assets/solarsystem/3.jpg"/><p id="earth" class="planets">EARTH</p></router-link></li>
                <li id="mars_li" class="new_li"><router-link to="/missions"><img class="image" src="@/assets/solarsystem/4.jpg"/><p id="mars" class="planets">MARS</p></router-link></li>
                <li id="jupyter_li" class="new_li"><router-link to="/missions"><img class="image" src="@/assets/solarsystem/5.jpg"/><p id="jupyter" class="planets">JUPYTER</p></router-link></li>
                <li id="saturn_li" class="new_li"><router-link to="/missions"><img class="image" src="@/assets/solarsystem/6.jpg"/><p id="saturn" class="planets">SATURN</p></router-link></li>
                <li id="uranus_li" class="new_li"><router-link to="/missions"><img class="image" src="@/assets/solarsystem/7.jpg"/><p id="uranus" class="planets">URANUS</p></router-link></li>
                <li id="neptune_li" class="new_li"><router-link to="/missions"><img class="image" src="@/assets/solarsystem/8.jpg"/><p id="neptune" class="planets">NEPTUNE</p></router-link></li>
                <li id="pluto_li" class="new_li"><router-link to="/missions"><img class="image" src="@/assets/solarsystem/9.jpg"/><p id="pluto" class="planets">PLUTO</p></router-link></li>
              </ul>
            </div>
          </div>
    <div class="scrollButton">
      <img @click="scrollToSecondPage" id="scrollImage" src="@/assets/scrollDown.svg">
    </div>
    <div class="container" id="latestnews" ref="latestnews">
      <h2 class="containertitle">LATEST NEWS</h2>
      <CardGrid :cards=computedNews :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="news"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardGrid from '../components/CardGrid.vue'
import NavMenu from '../components/NavMenu.vue'

export default {
  name: 'Home',
  components: {
    CardGrid,
    NavMenu
  },
  data: function(){
    return {
      cNews: [],
      news: [],
      info: "",
      cardsHeight: 450,
      cardsWidth: 320,
      missions: {
        "1" : {
          id: 1, 
          header: "Saturn",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLRngWRtusnSjujML2IuDO4NDkF0wdAjRbRg&usqp=CAU",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        },
        "2" : { 
          id: 2,   
          header: "Pluto",
          img: "https://i.pinimg.com/originals/05/7f/9a/057f9afad62b6b4b4988fa5ca003fe87.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        },
        "3" : {    
          id: 3,
          header: "Venus",
          img: "https://images.creativemarket.com/0.1.0/ps/1626035/300/200/m2/fpc/wm0/vjgnffpklazgjyzse4qi3n8limeczpisrgq35l6cbyxyrbnwtprs8iaopu4xhzir-.jpg?1473091169&s=49ea4d73823d558c8746a4f86863a9db",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        },
        "4" : {
          id: 4, 
          header: "Saturn",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLRngWRtusnSjujML2IuDO4NDkF0wdAjRbRg&usqp=CAU",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        },
        "5" : { 
          id: 5,   
          header: "Pluto",
          img: "https://i.pinimg.com/originals/05/7f/9a/057f9afad62b6b4b4988fa5ca003fe87.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        },
      }
    }
  },
  mounted(){
    axios
      .get('https://laikapp.herokuapp.com/api/v1/news/latest/5')
      .then(response => (this.news = response.data));
  },
  computed: {
    computedNews(){
      console.log(this.news);
      this.news.forEach( (item, index) => {
        var t = {
          id: item.id,
          header: item.title,
          date: item.date,
          content: item.content.slice(0, 100) + "...",
          fullContent: item.content,
          img: item.img,
          source: item.source,
          tags: item.tags,
        };
       this.cNews.push(t)
      });
      return this.cNews;
    },
    getCardsHeight(){
      return window.innerHeight/2.1;
    },
    getCardsWidth(){
      return window.innerWidth/6.25;
    }
  },
  methods: {
    scrollToSecondPage(e){
      scroll({
        top: this.$refs.latestnews.offsetTop - 100,
        behavior: "smooth"
      })
    }
  }
}
</script>

<style lang="scss">
@import url(//db.onlinewebfonts.com/c/00370d92f1b404768d34ac7dc664289e?family=Sansation);

$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

*{
  font-family: "Sansation", Arial;
}

#scrollImage{
  cursor: pointer;
  width: 50px;
  margin: auto;
  height: 100%;
}

.scrollButton{
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: 0;
}

.containertitle{
  letter-spacing: 3px;
  color: whitesmoke;
  font-size: 30px;
  padding-top: 6px;
  padding-bottom: 6px;
  width: 100%;
}

body {
  margin: 0 auto;
  font-size: 14px;
  font-weight: 500;
  background-color: #0F154D;
  -webkit-font-smoothing: antialiased;
}

.new_li{
  display:inline-block;
  width: 8%;
  padding-left: 0.7%;
  padding-right: 0.7%;
  margin: 0 auto;
}

#pianeti{
  width: initial;
  height: 580px;
  padding-right: 0px;
  padding-left: 0px;
}

.image{
  max-width: 100%;
  margin: 0;
  float: right;
  height: auto;
}

.solar_div{
  padding-top: 50px;
  margin: 0;
  height: 700px;
  width: 100%;
}

.system_div{
  margin: 0;
  height: 630px;
  width: 100%;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #5D4037;
  text-align: center;
}

p {
  line-height: 1.5em;
}

h1+p, p+p {
  margin-top: 10px;
}

#latestnews{
  padding-top: 0px !important;
}

.container {
  margin-top: 150px;
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#venus_li:hover #venus{
  opacity: 100%;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#venus_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#mercury_li:hover #mercury{
  opacity: 100%;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#mercury_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#earth_li:hover #earth{
  opacity: 100%;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#earth_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#mars_li:hover #mars{
  opacity: 100%;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#mars_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#jupyter_li:hover #jupyter{
  opacity: 100%;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#jupyter_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#saturn_li:hover #saturn{
  opacity: 100%;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#saturn_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#uranus_li:hover #uranus{
  opacity: 100%;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#uranus_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#neptune_li:hover #neptune{
  opacity: 100%;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#neptune_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#pluto_li:hover #pluto{
  opacity: 100%;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#pluto_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#venus, #earth, #pluto{
  letter-spacing: 5.1vw !important;
}

#saturn, #uranus{
  letter-spacing: 3.4vw !important;
}

#mars{
  letter-spacing: 7.9vw !important;
}

.planets{
  opacity: 0%;
  transition:filter 800ms;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
  text-shadow: 1px 1px 5px black;
  padding-top: 0.3vw;
  color: whitesmoke;
  letter-spacing: 2.3vw;
  text-align:justify;
  line-height: 70%;
  font-size: 3vw;
  position: absolute;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

</style>
