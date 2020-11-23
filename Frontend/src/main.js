import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Sticky from 'vue-sticky-directive'

Vue.use(Sticky)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
