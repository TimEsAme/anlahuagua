import ErrorLogger from "./ErrorLogger.vue";

export default {
  install(app, options) {
    // 1.参数归一化
    // 这只一个默认的options

    const defaultOptions = {
      //   是否打印到控制台
      logToConsole: true,
      //   是否把错误日志发送到服务器
      remotoLogging: false,
      //   远程日志服务器地址
      remotoUrl: "",
    };
    // 合并用户配置
    const config = { ...defaultOptions, ...options };

    // 2.捕获错误

    // (1)全局vue错误
    app.config.errorHandler = (err, vm, info) => {
      logError(err, info);
    };

    // (2)未处理的Promise错误
    window.addEventListener("unhandledrejection", (event) => {
      logError(event.reason, "unhandled Promise rejection error!!!");
    });

    // 3.统一交给错误处理函数处理

    // 错误处理函数
    function logError(error, info) {
      if (config.logToConsole) {
        console.error(`[错误: ${info}]`, error);
      }

      if (config.remotoLogging && config.remoteUrl) {
        fetch(config.remoteUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            error: error.message, // 错误消息
            stack: error.stack, // 错误堆栈
            info, // 具体错误说明信息
            time: new Date().toISOString(), // 记录时间
          }),
        }).catch(console.error);
      }
    }

    // 4.注册这个组件
    app.component("ErrorLogger", ErrorLogger);
  },
};
