import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import News from "@/pages/News.vue";
import About from "@/pages/About.vue";
import Detail from "@/pages/Detail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
          // path: "detail",
          // params传参需要修改,加上问号可以让这个参数不是必传
          path: "detail/:id/:title/:content?",
          component: Detail,
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
