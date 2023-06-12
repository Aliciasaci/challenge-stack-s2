import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () =>import ('../views/Login.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import ('../views/SingnIn.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
