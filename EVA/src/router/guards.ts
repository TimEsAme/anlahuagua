// 鉴权
import router from "./index";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import useUserStore from "@/store/modules/user";
import setting from "@/setting";
nprogress.configure({ showSpinner: false });

router.beforeEach(async (to, _from) => {
  document.title = `${setting.title} - ${to.meta.title || ""}`;
  const useStore = useUserStore();
  nprogress.start();

  if (useStore.token) {
    // 有token不让访问登录页
    if (to.path == "/login") {
      return { path: "/" };
    } else {
      // 有token,需要查看是否有用户信息
      if (useStore.username) {
        // 有就放行
        return true;
      } else {
        // 没有就发请求
        try {
          await useStore.userInfo(useStore.token);
          return { ...to, replace: true };
        } catch (error) {
          await useStore.userLogOut(useStore.token);
          return { path: "/login", query: { redirect: to.path } };
        }
      }
    }
  } else {
    // 没token访问登录页直接放行
    if (to.path == "/login") {
      return true;
    } else {
      // 没token只能访问登录页并带上想访问的页面
      return { path: "/login", query: { redirect: to.path } };
    }
  }
});

router.afterEach((_to, _from) => {
  nprogress.done();
});
