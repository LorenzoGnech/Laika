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
    path: '/search/:value(.*)',
    name: 'Search',
    component: () => import('../views/Search.vue')
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
  {
    path: '/LatestNews',
    name: 'LatestNews',
    component: () => import('../views/LatestNews.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/Mission/:value(.*)',
    name: 'Mission',
    component: () => import('../views/Mission.vue')
  },
  {
    path: '/Missions/:value(.*)',
    name: 'Missionsvalue',
    component: () => import('../views/Missions.vue')
  },
  {
    path: '/Astronaut/:value(.*)',
    name: 'Astronaut',
    component: () => import('../views/Astronaut.vue')
  },
  {
    path: '/Exoplanet/:value(.*)',
    name: 'Exoplanet',
    component: () => import('../views/Exoplanet.vue')
  },
  {
    path: '/Telescope/:value(.*)',
    name: 'Telescope',
    component: () => import('../views/Telescope.vue')
  },
  {
    path: '/news/:value(.*)',
    name: 'News',
    component: () => import('../views/News.vue')
  }
]

const router = new VueRouter({
  scrollBehavior(){
    return {x: 0, y: 0};
  },
  routes
})

export default router
