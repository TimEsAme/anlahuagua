export default defineNuxtPlugin((nuxtApp) => {
  console.log("error插件已加载");

  //   nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
  //     console.error("errorHandler错误对象", err);
  //     console.log("errorHandler组件实例", instance);
  //     console.log("errorHandler信息来源", info);
  //   };

  nuxtApp.hook("vue:error", (err, instance, info) => {
    console.error("vue:erro错误对象", err);
    console.log("vue:erro组件实例", instance);
    console.log("vue:erro信息来源", info);
  });
});
