import { createSSRApp } from "vue";

export function createApp() {
  // 创建vue实例
  const app = createSSRApp({
    template: `
            <div>
                <h1>Hello SSR</h1>
                <p>{{message}}</p>
                <button @click="count++">{{ count }}</button>
            </div>
        `,
    data: () => ({
      count: 1,
      message: "这是一个SSR最简单的demo",
    }),
  });

  return app;
}
