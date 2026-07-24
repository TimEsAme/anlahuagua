// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "~/assets/css/transition.css"],
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout-fade",
      mode: "out-in",
    },
  },
  modules: [
    "@pinia/nuxt",
    ["@element-plus/nuxt", { icon: "" }],
    "./modules/my-module",
  ],
});
