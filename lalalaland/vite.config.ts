import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  // 项目根目录 index.html的位置
  // root: "",

  // 全局常量(要JSON可序列化的值)
  // define: "",

  plugins: [vue()],

  resolve: {
    //路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // 导入时,省略文件扩展名
    // 自定义扩展名顺序
    // extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },

  // css: {
  //   // 该配置项用于配置PostCSS的行为，可以是内联的PostCSS配置也可以是自定义目录。
  //   postcss: {
  //     // 在这里配置 postcss 相关信息，例如用哪个插件....
  //     plugins: [autoprefixer(), cssnano()],
  //   },
  //   // 配置 css 预处理器
  //   preprocessorOptions: {
  //     scss: {
  //       // 相当于给所有的 Scss 文件的头部都添加了这个引用，自动导入 mixins.scss 混合器文件
  //       additionalData: `@import "@/styles/mixins.scss";`,
  //     },
  //   },
  //   // 开启 source maps
  //   devSourcemap: true,
  // },

  server: {},
});
