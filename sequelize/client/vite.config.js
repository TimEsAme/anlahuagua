import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // 将 @ 指向 src 目录
    },
  },
  server: {
    proxy: {
      // 将所有以 /api 开头的请求代理到目标服务器
      '/api': {
        target: 'http://localhost:9527',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: path.resolve(__dirname, "../public"),
    emptyOutDir: true,
  },
})