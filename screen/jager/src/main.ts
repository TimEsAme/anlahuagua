import { createApp } from "vue";
import "@/assets/css/index.scss";
import router from "@/router";
import App from "./App.vue";
import chart from "./components/chart";
import pinia from "./store";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(chart);
app.mount("#app");
