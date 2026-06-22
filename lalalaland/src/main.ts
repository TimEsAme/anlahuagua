import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import errorLoggers from "./plugins/ErrorLogger/error-loggers";
import { logPlugin } from "./plugins/logPlugin.js";
import { ObserveVisibility } from "vue3-observe-visibility";

const app = createApp(App);

const pinia = createPinia();
pinia.use(logPlugin);

// 自定义指令设置按钮权限
const u = ["admin"];

app.directive("permission", {
  mounted(el, binding) {
    const requiredPerms = binding.value;

    if (Array.isArray(requiredPerms)) {
      const hasPermission = requiredPerms.some((p) => u.includes(p));

      if (!hasPermission) {
        el.parentNode?.removeChild(el);
      }
    }
  },
});

app.use(pinia);
app.use(errorLoggers, {
  logToConsole: true,
  remotoLogging: false,
  remotoUrl: "",
});

app.directive("observe-visibility", ObserveVisibility);
app.mount("#app");
