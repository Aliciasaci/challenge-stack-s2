import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from "@/layout/AppLayout.vue";

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
          path: "/user-crud",
          name: "usercrud",
          component: () => import("@/views/UserCrud.vue"),
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
    },
    {
      path: "/client-pannel",
      name: "clientpannel",
      component: () => import("@/views/ClientPannel.vue"),
    },
    {
      path: "/profil-user",
      name: "profiluser",
      component: () => import("@/views/ProfilUser.vue"),
    },
  ],
})

export default router
