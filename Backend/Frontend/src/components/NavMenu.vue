<template>
    <div id="menu-wrap">
      <div id="opaque"></div>
      <form id="searchbar" v-on:submit.prevent="searchquery();">
        <input id="searchbar_input" type="search" v-model="query" name="search">
        <i class="fa fa-search"></i>
        <button id="diocane" type="submit" style="border-width: 0px; background-color: white;">
          <img id="searchicon" src="@/assets/searchbar.png"/>
        </button>
      </form>
      <div id="line1"></div>
      <div id="line2"></div>
      <router-link to="/"><img src="@/assets/LaikaLogo.png" id="logo"></router-link>
      <ul id="menulist">
        <li id="login" class="navlink"><router-link to="/signin">{{username != "" ? username : "Login/Signup"}}</router-link></li>
        <li class="navlink"><router-link to="/api">API</router-link></li>
        <li class="navlink"><router-link to="/exoplanets">Exoplanets</router-link></li>
        <li class="navlink"><router-link to="/telescopes">Telescopes</router-link></li>
        <li class="navlink"><router-link to="/missions">Missions</router-link></li>
        <li class="navlink"><router-link to="/astronauts">Astronauts</router-link></li> 
        <li id="burgermenu" href="javascript:void(0);" :class="['icon', 'navlink']" @click="burgerTrigger">
          <img v-if="!burgerActive" src="@/assets/burger.png" id="burgericon">
          <img v-if="burgerActive" src="@/assets/close.png" id="closeicon">
        </li> 
      </ul>
      <ul id="dropdownmenu" :class="{responsive : burgerActive}">
        <li class="navlink"><router-link to="/astronauts">Astronauts</router-link></li> 
        <li class="navlink"><router-link to="/missions">Missions</router-link></li>
        <li class="navlink"><router-link to="/telescopes">Telescopes</router-link></li>
        <li class="navlink"><router-link to="/exoplanets">Exoplanets</router-link></li>
        <li class="navlink"><router-link to="/api">API</router-link></li>
        <li id="dropdownlogin" class="navlink"><router-link to="/signin">{{username != "" ? username : "Login/Signup"}}</router-link></li>
      </ul>
    </div>
</template>

<script>

export default {
  name: 'NavMenu',
  components: {
  },
  data: function(){
      return{
          username: "",
          burgerActive: true,
          query: "",
      }
  },
  props: {
  },
  mounted(){
    this.burgerActive = false
  },
  computed: {
  },
  methods: {
    searchquery(){
      if (this.query != ""){
        var url = this.query.split(" ");
        url = "search/?search=" + url.join("+");
        console.log(url);
        this.query = "";
        this.$router.push(url);
      }
    },
    burgerTrigger(){
      this.burgerActive = !this.burgerActive
    }
  }
}
</script>

<style lang="scss">
$curveColor: #00ffff;

#menu-wrap {
  padding: 0;

  #burgermenu{
    text-align: center;
  }

  #burgericon{
    margin: auto;
    cursor: pointer;
    width: 35px;
    padding-top: 13px;
  }

  #closeicon{
    margin: auto;
    cursor: pointer;
    width: 33px;
    padding-top: 13px;
  }

  .icon{
    display:none;
  }

  #dropdownmenu{
    border: 2px solid #00ffff;
    z-index: -1;
    background: rgb(0,0,0);
    position: absolute;
    right: 0px;
    left: initial;
    height: 100%;
    list-style-type: none;
    padding-right: 0;
    padding-left: 0;
    display:none;
    width: 100px;
  }

  #dropdownlogin{
    a{
        color:lightskyblue
    }
  }

  #burgermenu{
    padding-right: 30px;
  }

  @media screen and (max-width: 1190px) {
    #menulist li {display: none;}
    #menulist li.icon {
      float: right;
      display: block;
    }
  }

  @media screen and (max-width: 1190px) {
    #menulist.responsive {position: relative;}
    #menulist.responsive .icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    #menulist.responsive li {
      float: none;
      display: block;
      text-align: left;
    }
    #dropdownmenu.responsive {
      display:table;
      
    }
    #dropdownmenu.responsive li {
      float: none;
      display: block;
      text-align: right;
      width: 100%;
      height: 30px;
      line-height:30px;
      margin: 0 auto;
      padding-top: 10px;
      padding-bottom: 10px;
      position: relative;
    }

    #dropdownmenu.responsive li a {
      line-height: 0;
      position: relative;
      margin: 0 auto;
    }
  }

  #menulist{
    overflow: hidden;
  }

  #opaque{
    z-index: -1;
    height: 65px;
    right: 0;
    position:fixed;
    width: 80%;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4096989137451855) 30%);
    background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.55) 88%,  rgba(0,0,0,0.1) 95%, rgba(0,0,0,0) 100%);
  }

  #outline{
    position: fixed;
    left: 0%;
    top: 0%;
    max-width:1000px;
    overflow:hidden;
  }

  #searchicon{
    position: fixed;
    right: 2px;
    top: 1px;
    width: 67px;
  }

  #logo{
    position:fixed;
    left: 2%;
    top: 25px;
    width: 300px;
  }

  #line1{
    position: fixed;
    left: 0px;
    top: 65px;
    width: 2%;
    height: 1.2px;
    background-color: #00ffff;
  }

  #line2{
    position: fixed;
    right: 75px;
    top: 65px;
    width: calc(98% - 355px);
    height: 1.2px;
    background-color: #00ffff;
  }

  a {
    font-weight: bold;
    color:whitesmoke;

    &.router-link-exact-active {
      color: lightseagreen;
    }
  }
}



ul {
  margin: 0 auto;
  left: 280px;
  display:table;
  height: 65px;
  width: 70%;
  list-style-type: none;
  padding-right: 5%;
  padding-left: 20%
}

.navlink {
  float: right;
  height: 100%;

  a{
    line-height: 65px;
    height: 100%;
    width: 100%;
    font-size: 1.5em;
    text-align: center;
    padding: 16px;
    text-decoration: none;
  }

  a:hover{
     color: #078aa6 !important;
  }
}


#login{
    padding-left: 30px;

    a{
        color:lightskyblue
    }
}

#searchbar{
    position: fixed;
    top: 10px;
    right: 14px;
    transition: all 1s;
    width: 50px;
    height: 50px;
    background: white;
    box-sizing: border-box;
    border-radius: 25px;
    border: 4px solid white;
    padding: 5px;
}

#searchbar_input{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;;
  height: 42.5px;
  line-height: 30px;
  outline: 0;
  border: 0;
  display: none;
  font-size: 1em;
  border-radius: 20px;
  padding: 0 20px;
}

.fa{
    box-sizing: border-box;
    padding: 10px;
    width: 42.5px;
    height: 42.5px;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    color: #0F154D;
    text-align: center;
    font-size: 1.2em;
    transition: all 1s;
}

#searchbar:hover{
    width: 250px;
    cursor: pointer;
}

#searchbar:hover input{
    display: block;
}

#searchbar:hover .fa{
    background: white;
    color: white;
}

</style>