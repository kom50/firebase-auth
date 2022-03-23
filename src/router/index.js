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
  },
  {
    path: '/phone',
    name: 'phone',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/PhoneView.vue')
    }
  },
  {
    path: '/firestore',
    name: 'Firestore',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/FirestoreView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
