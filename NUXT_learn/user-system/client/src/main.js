import './assets/main.css'

// import { createApp } from 'vue'
import { createSSRApp } from 'vue'
// 引入了根组件
import App from './App.vue'
// import router from './router'
import { createRouter } from './router'
import { createPinia } from 'pinia'

// 引入组件库
import ElementPlus, { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
// 引入组件库相关样式
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// // 挂载根组件
// const app = createApp(App)

// // 引入图标
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

// const pinia = createPinia()

// app.use(router).use(pinia).use(ElementPlus).mount('#app')

export function createApp() {
  // 创建Vue应用实例
  const app = createSSRApp(App)

  // 提供id解决elmentui水合不一致
  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0
  })
  app.provide(ZINDEX_INJECTION_KEY, { current: 0 })

  // 创建路由实例
  const router = createRouter()
  const pinia = createPinia()
  // 引入图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(router).use(pinia).use(ElementPlus)
  // 需要将这些实例返回给外部
  return { app, router, pinia }
}
