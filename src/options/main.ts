import "./main.css";

import { createApp } from "vue";

import router from "@/options/router";
import store from "@/options/store";

import App from "./App.vue";

createApp(App).use(store).use(router).mount("#app");
