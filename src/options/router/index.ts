import { createRouter, createMemoryHistory, RouteRecordRaw } from "vue-router";
import ModifyHeaders from "@/options/modify-headers/ModifyHeaders.vue";
import RedirectUrl from "@/options/redirect-url/RedirectUrl.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: RedirectUrl,
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
  history: createMemoryHistory("/options.html"),
  routes,
});

export default router;
