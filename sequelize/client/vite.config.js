import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    proxy: {
      // 将所有以 /api 开头的请求代理到目标服务器
      '/api': {
        target: 'http://localhost:9527',
        changeOrigin: true,
      }
    }
  }
})