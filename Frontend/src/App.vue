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
