// 服务器端入口文件
import { createApp } from '../main'
import { renderToString } from 'vue/server-renderer'

// teleport的渲染方法
function renderTeleports(teleports) {
  if (!teleports) return ''
  return Object.entries(teleports).reduce((all, [key, value]) => {
    if (key.startsWith('#el-popper-container-')) {
      return `${all}<div id="${key.slice(1)}">${value}</div>`
    }
    return all
  }, teleports.body || '')
}

/**
 *
 * @param {*} url 用户请求的url
 * 根据不同的url，返回不同的首屏内容
 */
export async function render(url) {
  const { app, router, pinia } = createApp()

  // 根据用户请求的url，跳转到对应的路由
  router.push(url)

  // 等待路由跳转完成
  await router.isReady()

  // 目前为止，说明咱们的应用已经跳转到了对应的页面
  // 接下来需要对这个页面进行服务器端渲染，渲染为字符串
  const ctx = {}
  const html = await renderToString(app, ctx)
  const teleports = renderTeleports(ctx.teleports)

  // 注水
  const state = JSON.stringify(pinia.state.value)
  return [html, teleports, state]
}
