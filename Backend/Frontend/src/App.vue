<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
    name: 'Home',
    components: {
    },
    data: function(){
        return{
            
        }
    },
}
</script>

<style lang="scss">
@font-face {font-family: "Sansation";
    src: url("https://db.onlinewebfonts.com/t/00370d92f1b404768d34ac7dc664289e.eot"); /* IE9*/
    src: url("https://db.onlinewebfonts.com/t/00370d92f1b404768d34ac7dc664289e.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
    url("https://db.onlinewebfonts.com/t/00370d92f1b404768d34ac7dc664289e.svg#Sansation") format("svg"); /* iOS 4.1- */
}

html {
  scroll-behavior: smooth;
}

#app {
  font-family: "Playfair Display", "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0;

  a {
    font-weight: bold;
    color:whitesmoke;

    &.router-link-exact-active {
      color: lightseagreen;
    }
  }

  a:hover {
    background-color: #111;
  }
}

</style>
