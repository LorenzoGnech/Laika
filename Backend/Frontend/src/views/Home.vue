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
    <div id="divisor"></div>
    <div class="container containertitle-link" id="latestnews" ref="latestnews">
      <h2 class="containertitle" @click="handleClick('LatestNews')">LATEST NEWS</h2>
      <CardGrid :cards=computedNews :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="news"/>
    </div>
    <div class="container containertitle-link" id="latestmissions" ref="latestmissions">
      <h2 class="containertitle" @click="handleClick('missions')">LATEST MISSIONS</h2>
      <CardGrid :cards=computedMissions :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="mission"/>
    </div>
    <div class="container">
      <div class="blueline"></div>
      <h2 class="containertitle">Do you like space?<br>Subscribe to our newsletter!</h2>
      <form id="newsletterform" action="#" method="post">
        <input id="newslettermail" style="text-align:center;" type="email" placeholder="Email" name="email" required>
        <button type="submit" style="visibility: hidden;">Subscribe</button>
      </form>
      <div class="blueline"></div>
    </div>
    <div class="container containertitle-link" id="latesttelescopes" ref="latesttelescopes">
      <h2 class="containertitle" @click="handleClick('telescopes')">LATEST TELESCOPES</h2>
      <CardGrid :cards=computedTelescopes :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="telescope"/>
    </div>
    <div class="container containertitle-link" id="latestexoplanets" ref="latestexoplanets">
      <h2 class="containertitle" @click="handleClick('exoplanets')">LATEST EXOPLANETS</h2>
      <CardGrid :cards=computedExoplanets :cardsHeight="getCardsHeight" :cardsWidth="getCardsWidth" type="exoplanet"/>
    </div>
    <div class="container">
      <div class="blueline"></div>
      <h2 class="containertitle" style="margin: 15px;">Are you a developer?<br> Take a look at our APIs!</h2>
      <a href="#/api" id="api-button">LAIKA APIs</a>
      <div class="blueline"></div>
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
      cExoplanets: [],
      exoplanets: [],
      cTelescopes: [],
      telescopes: [],
      cMissions: [],
      missions: [],
      cNews: [],
      news: [],
      info: "",
      cardsHeight: 450,
      cardsWidth: 320,
    }
  },
  mounted(){
    this.getLatestNews();
    this.getLatestMissions();
    this.getLatestTelescopes();
    this.getLatestExoplanets();
  },
  computed: {
    computedNews(){
      this.news.forEach( (item, index) => {
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
       this.cNews.push(t)
      });
      return this.cNews;
    },
    computedMissions(){
      this.missions.forEach( (item, index) => {
        var t = {
          id: item._id,
          header: item.title,
          date: item.date,
          content: item.description.slice(0, 100) + "...",
          fullContent: item.description,
          img: item.img_path,
          source: item.source_url,
          tags: item.tags,
        };
       this.cMissions.push(t)
      });
      return this.cMissions;
    },
    computedTelescopes(){
      this.telescopes.forEach( (item, index) => {
        if(item.img != undefined && item.img.length == 0){
          item.img.push("");
        }
        var t = {
          id: item._id,
          header: item.name,
          date: item.launch_date,
          content: item.description.slice(0, 100) + "...",
          fullContent: item.description,
          img: item.img_path,
          source: item.source_url,
          tags: item.tags,
        };
       this.cTelescopes.push(t)
      });
      return this.cTelescopes;
    },
    computedExoplanets(){
      this.exoplanets.forEach( (item, index) => {
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
       this.cExoplanets.push(t)
      });
      return this.cExoplanets;
    },
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
      this.$router.push(link);
    },
    scrollToSecondPage(e){
      scroll({
        top: this.$refs.latestnews.offsetTop - 100,
        behavior: "smooth"
      })
    },
    async getLatestNews(){
      axios
        .get('https://laikapp.herokuapp.com/api/v1/news/latest/5')
        .then(response => (this.news = response.data));
    },
    async getLatestMissions(){
      axios
        .get('https://laikapp.herokuapp.com/api/v1/missions/latest/5')
        .then(response => (this.missions = response.data));
    },
    async getLatestTelescopes(){
      axios
        .get('https://laikapp.herokuapp.com/api/v1/telescopes/latest/5')
        .then(response => (this.telescopes = response.data));
    },
    async getLatestExoplanets(){
      axios
        .get('https://laikapp.herokuapp.com/api/v1/exoplanets/latest/5')
        .then(response => (this.exoplanets = response.data));
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

#api-button{
  position: relative;
	padding: 10px 40px;
  margin: 0px 10px 30px 0px;
  float: left;
	border-radius: 300px;
	font-family: 'Lato', sans-serif;
	font-size: 30px;
	color: #FFF;
	text-decoration: none;	
	background-color: #3498db;
	border-bottom: 5px solid #2980B9;
	text-shadow: 0px -2px #2980B9;
  transition: all 0.1s;
	-webkit-transition: all 0.1s;
}

#api-button:active
{
	transform: translate(0px,5px);
  -webkit-transform: translate(0px,5px);
	border-bottom: 1px solid;
}

#divisor{
  height: 10vh;
  width: 100%;
}

#newslettermail{
  background-color: whitesmoke;
  width: 100%;
  height: 75px;
  margin: 8px 0;
  border: none;
  border-radius: 100px;
  font-size: 25px;
}

input:focus {
    outline:none;
}

#newsletterform{
  width: 400px;
  padding: 10px 10px;
}

#scrollImage{
  float: right;
  padding-right: 2%;
  cursor: pointer;
  width: 50px;
  margin: auto;
  height: 100%;
}

#scrollImage:hover{
  animation: shake 3s;  
}

@keyframes shake {
  0% { transform: translate(0px, 0px); }
  15% { transform: translate(0px, -7px); }
  30% { transform: translate(0px, 0px); }
  45% { transform: translate(0px, -7px); }
  60% { transform: translate(0px, 0px); }
  75% { transform: translate(0px, -7px); }
  90% { transform: translate(0px, 0px); }
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

.containertitle-link{
cursor: pointer;
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
  margin-top: 4vh;
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.blueline{
    width: 100%;
    height: 2px;
    background-color: #00ffff;
}

#venus_li:hover #venus{
  opacity: 1;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#venus_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#mercury_li:hover #mercury{
  opacity: 1;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#mercury_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#earth_li:hover #earth{
  opacity: 1;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#earth_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#mars_li:hover #mars{
  opacity: 1;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#mars_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#jupyter_li:hover #jupyter{
  opacity: 1;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#jupyter_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#saturn_li:hover #saturn{
  opacity: 1;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#saturn_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#uranus_li:hover #uranus{
  opacity: 1;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#uranus_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#neptune_li:hover #neptune{
  opacity: 1;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:opacity 800ms;
}

#neptune_li:hover img{
  filter: blur(1px);
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition:filter 800ms;
}

#pluto_li:hover #pluto{
  opacity: 1;
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
