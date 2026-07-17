import { createApp } from '../main'

const { app, router, pinia } = createApp()

// 恢复服务端状态
if (window.__PINIA_STATE__) {
  pinia.state.value = window.__PINIA_STATE__
}

router.isReady().then(() => {
  app.mount('#app')
})
