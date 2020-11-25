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

export default {
  name: 'Telescopes',
  components: {
    NavMenu
  },
  data: function(){
    return {
    }
  },
}

</script>

<style lang="scss" scoped>

</style>