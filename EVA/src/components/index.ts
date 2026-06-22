// import type { App, Component } from "vue";
// const globalComponents = new Map<string, Component>();

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
export default {
  install(app: any) {
    // globalComponents.forEach((component, name) => {
    //   app.component(name, component);
    // });

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
