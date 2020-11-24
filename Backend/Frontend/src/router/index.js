import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/astronauts',
    name: 'Astronauts',
    component: () => import('../views/Astronauts.vue')
  },
  {
    path: '/missions',
    name: 'Missions',
    component: () => import('../views/Missions.vue')
  },
  {
    path: '/telescopes',
    name: 'Telescopes',
    component: () => import('../views/Telescopes.vue')
  },
  {
    path: '/exoplanets',
    name: 'Exoplanets',
    component: () => import('../views/Exoplanets.vue')
  },
  {
    path: '/api',
    name: 'API',
    component: () => import('../views/Api.vue')
  },
  {
    path: '/Signin',
    name: 'SignIn',
    component: Login,
  },
]

const router = new VueRouter({
  scrollBehavior(){
    return {x: 0, y: 0};
  },
  routes
})

export default router
