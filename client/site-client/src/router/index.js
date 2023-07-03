import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "/documentation",
    name: "documentation",
    component: () => import("../views/Documentation.vue"),
  },
  {
    path: "/mention-legale",
    name: "mentionlegale",
    component: () => import("../views/Legale.vue"),
  },
  {
    path: "/article/:id",
    name: "article",
    component: () => import("../views/ArticleView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
