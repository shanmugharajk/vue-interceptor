import { createRouter, createMemoryHistory, RouteRecordRaw } from "vue-router";
import ModifyHeaders from "@/modify-headers/ModifyHeaders.vue";
import RedirectUrl from "@/redirect-url/RedirectUrl.vue";

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
