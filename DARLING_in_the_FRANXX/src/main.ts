import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import Hello from "./components/Hello.vue";
// 创建应用
const app = createApp(App);
// 创建pinia
const pinia = createPinia();

app.component("Hello", Hello);

app.config.globalProperties.jager = "艾伦耶格尔";
declare module "vue" {
  interface ComponentCustomProperties {
    jager: string;
  }
}

// 安装插件
app.use(pinia);
// 挂载应用
app.mount("#app");
