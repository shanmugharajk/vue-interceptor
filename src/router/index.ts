import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/home/Home.vue";
import ModifyHeaders from "@/modify-headers/ModifyHeaders.vue";
import RedirectUrl from "@/redirect-url/RedirectUrl.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/options.html",
    name: "Home",
    component: Home,
  },
  {
    path: "/redirect-url",
    name: "RedirectUrl",
    component: RedirectUrl,
  },
  {
    path: "/modify-headers",
    name: "ModifyHeaders",
    component: ModifyHeaders,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
