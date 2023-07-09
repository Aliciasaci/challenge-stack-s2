import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from "@/layout/AppLayout.vue";

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: () =>import ('../views/Login.vue')
//   },
//   {
//     path: '/signin',
//     name: 'signin',
//     component: () => import ('../views/SingnIn.vue')
//   },
//   {
//     path: '/admin-pannel',
//     name: 'adminpannel',
//     component: () => import ('../views/AdminPannel.vue')
//   },
//   {
//     path: '/client-pannel',
//     name: 'clientpannel',
//     component: () => import ('../views/ClientPannel.vue')
//   },
// ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "/admin-panel",
          name: "adminpanel",
          component: () => import("@/views/AdminPanel.vue"),
        }
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("@/views/Signin.vue"),
    }
  ],
})

export default router
