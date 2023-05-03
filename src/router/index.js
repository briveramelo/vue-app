import {createRouter, createWebHistory } from 'vue-router'
import Body from './../components/BodyC.vue'
import Login from './../components/LoginC.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Body
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({history: createWebHistory(), routes})
export default router