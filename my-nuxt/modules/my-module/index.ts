// `nuxt/kit` 是一个定义本地模块时可以使用的辅助子路径导入
// 这意味着你不需要将 `@nuxt/kit` 添加到你的项目依赖中
import { defineNuxtModule, createResolver, addImportsDir } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "my-module",
  },

  setup() {
    const { resolve } = createResolver(import.meta.url);
    addImportsDir(resolve("runtime/composables"));
  },
});
