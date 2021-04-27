import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/home/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/options.html",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
