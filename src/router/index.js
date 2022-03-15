import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: { transitionName: 'slide-left' }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
        meta: { transitionName: 'slide-right' }
    },

    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/RegisterView.vue'),
        meta: { transitionName: 'slide-left' }

    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue')
        , meta: { transitionName: 'slide-right' }

    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue')
        , meta: { transitionName: 'slide-left' }

    }]
})


export default router