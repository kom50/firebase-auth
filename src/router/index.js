import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
