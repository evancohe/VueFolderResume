import Vue from 'vue'
import VueRouter from 'vue-router'
import Enter from '../views/Enter'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'enter',
    component: Enter
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router