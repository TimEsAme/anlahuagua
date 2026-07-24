// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      title: "IKUN",
      link: [
        {
          rel: "icon",
          type: "image/vnd.microsoft.icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
  css: ["~/assets/css/global.css"],

  modules: ["@element-plus/nuxt", "@pinia/nuxt"],

  elementPlus: {
    icon: "",
  },

  devServer: {
    port: 9527,
  },
});
