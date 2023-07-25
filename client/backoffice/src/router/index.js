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
          path: "/admin-panel",
          name: "home",
          component: () => import("@/views/Home.vue"),
          meta: {
            allowedRoles: ["USER_ADMIN"],
          }
        },
        {
          path: "/users",
          name: "usercrud",
          component: () => import("@/views/UserCrud.vue"),
          meta: {
            allowedRoles: ["USER_ADMIN"],
          }
        },
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
      path: "/client-panel",
      name: "clientpanel",
      component: () => import("@/views/ClientPanel.vue"),
      meta: {
        allowedRoles: ["USER_CLIENT", "USER_ADMIN"],
      }
    },
    {
      path: "/profil-user",
      name: "profiluser",
      component: () => import("@/views/ProfilUser.vue"),
      meta: {
        allowedRoles: ["USER_CLIENT", "USER_ADMIN"],
      }
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () => import("@/views/Access.vue"),
    },
  ],
})


// routes guard
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const allowedRoles = to.meta.allowedRoles;

  if (allowedRoles && !user) {
    next("/login");
  } else if (allowedRoles && user) {
    if (!allowedRoles.includes(user.role)) {
      next("/unauthorized");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router
