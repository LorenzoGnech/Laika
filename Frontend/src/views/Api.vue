<template>
  <div id="app">
          <div class="sticky" v-sticky="true" sticky-offset="{top: 0, right: 0}" sticky-side="both" on-stick="onStick" sticky-z-index="20">
              <NavMenu/>
          </div>
    <div class="container">
      <p class="title">{{apititle}}</p>
      <p class="body">{{apibody}}</p>
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
      apibody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel dui at libero tristique blandit sed et nisl. Curabitur vel suscipit nisi. Donec suscipit auctor lacus. Etiam lacinia tincidunt placerat. Aenean eu efficitur nibh, eu auctor velit. Morbi finibus auctor ultricies. Nulla quis vulputate ipsum. Mauris condimentum tellus erat, sit amet tincidunt neque ornare eget. Nunc tempus velit sit amet ultricies fringilla. Vivamus lorem purus, rhoncus quis dictum a, pellentesque eu nisl.'
      
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



</style>

