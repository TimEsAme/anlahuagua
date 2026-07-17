import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// 从 Node 的 module 模块中导入 createRequire
// 用于在 ESM 中创建 CommonJS 风格的 require
import { createRequire } from 'module'

// 从 Node module 模块创建 require
const require = createRequire(import.meta.url)

// ESM 环境模拟 CommonJS 的 __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 以当前文件上一级目录为基准，解析绝对路径
const resolve = (p) => path.resolve(__dirname, '..', p)

export async function createServer() {
  // 1.创建express服务
  const app = express()

  // 2. 将 vite 创建的服务器以中间件的形式添加到 express 应用中
  // 从而能够使用 vite 的热模块更新等特性
  const vite = await require('vite').createServer({
    server: {
      middlewareMode: true
    },
    appType: 'custom'
  })
  app.use(vite.middlewares)

  app.use(async (req, res, next) => {
    // 拿到请求的 url
    const url = req.originalUrl
    let template = fs.readFileSync(resolve('index.html'), 'utf-8')

    // 调用 vite 的 transformIndexHtml 方法
    // 注入一些必要的脚本和样式，为了使用 vite 的热更新等特性
    template = await vite.transformIndexHtml(url, template)
    // 读取服务端入口文件拿到 render 方法
    const render = (await vite.ssrLoadModule('/src/entry/server-entry.js')).render
    // 拿到的是Vue应用的html字符串
    const [appHtml, teleports, state] = await render(url)
    // 接下来做替换操作
    const html = template
      .replace(`<!--vue-ssr-jojo-->`, appHtml)
      .replace(/(\n|\r\n)\s*<!--app-teleports-->/, teleports)
      .replace('<!--pinia-state-->', `<script>window.__PINIA_STATE__=${state}</script>`)
    // 返回给客户端
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    try {
    } catch (error) {
      vite.ssrFixStacktrace(error)
      console.error(error)
      res.status(500).send('Server Error')
      next()
    }
  })

  return app
}
