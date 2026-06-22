import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import News from "@/pages/News.vue";
import About from "@/pages/About.vue";
import Detail from "@/pages/Detail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      name: "home",
      path: "/home",
      component: Home,
    },
    {
      name: "news",
      path: "/news",
      component: News,
      children: [
        {
          // params传参必须配置name
          name: "detail",

          // query传参不改
          path: "detail",

          // params传参需要修改,加上问号可以让这个参数不是必传
          // path: "detail/:id/:title/:content?",

          component: Detail,

          // 将路由收到的所有params参数作为props传给路由组件
          // 这种方法是params限定
          // props: true,

          // 函数式直接返回
          // 这种方法一般适配query参数
          props(route) {
            return route.query;
          },

          // 自己配置一个对象
          // props: {
          //   a: 100,
          //   b: 200,
          // },
        },
      ],
    },
    {
      name: "about",
      path: "/about",
      component: About,
    },
  ],
});

export default router;
