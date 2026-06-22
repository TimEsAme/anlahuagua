import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      svgLoader(),
      viteMockServe({
        mockPath: "mock",
        enable: command === "serve",
        watchFiles: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
          quietDeps: true,
        },
      },
    },
    server: {
      port: 5173, // 前端开发服务器端口（可选）
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 即 '/api'
          target: env.VITE_SERVE, // 即 'http://127.0.0.1:10086'
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
