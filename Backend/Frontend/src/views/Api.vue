<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
    <div class="container">
      <p class="title">{{apititle}}</p>
      <p class="body">{{apibody}}</p>
      <div>
        <a href="https://github.com/LorenzoGnech/Laika/wiki" id="api-button">LAIKA WIKI</a>
        <a href="https://app.apiary.io/laikaapi" id="api-button">APIARY</a>
      </div>
    </div>
  </div>
</template>

<script>

import NavMenu from '../components/NavMenu.vue'

export default {
  name: 'Api',
  components: {
    
    NavMenu
  },
  data: function(){
    return {
      apititle: 'API Documentation',
      apibody: 'The Laika project is a web portal for issues related to astronomy. Users can discover the latest news in astronomy, more specifically space missions, the most famous astronauts and their current position, recently discovered exoplanets and telescopes currently in orbit. Users can subscribe to the general newsletter to receive notifications about the latest news, or to mission-specific newsletters; they can also register on the site to set certain news as preferred so that they can find them more easily. In addition, a user can access the API below the site so that they can use it themselves.'
    }
  },
}
</script>

<style lang="scss" scoped>

.title {
  color: #fff;
  text-align: right;
  font-size: 30px;
}

.body{
  color: #fff;
  text-align: left;
  font-size: 20px;
}

#api-button{
  position: relative;
	padding: 10px 40px;
  margin: 10px 10px 30px 20px;
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



</style>

