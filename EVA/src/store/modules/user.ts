import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import { constantRoutes, asnycRoute, anyRoute } from "@/router/routes";
import type {
  LoginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from "@/api/user/type";
import { cloneDeep } from "lodash";
import router from "@/router";

// 过滤动态路由
function filterAsRoute(asyncRoute: any[], routeSet: Set<string>) {
  return asyncRoute.filter((route: any) => {
    if (routeSet.has(route.name)) {
      if (route.children?.length) {
        route.children = filterAsRoute(route.children, routeSet);
      }
      return true;
    }
    return false;
  });
}

const useUserStore = defineStore("User", {
  state() {
    return {
      token: "",
      routesMenu: constantRoutes,
      username: "",
      avatar: "",
      btnArr: [] as string[],
    };
  },

  // persist: {
  //   pick: ["token"],
  // },

  actions: {
    // 登录
    async userLogin(data: LoginFormData) {
      const res: LoginResponseData = await reqLogin(data);

      if (res.code === 200) {
        this.token = res.data.token;
        return "ok";
      }

      return Promise.reject(new Error(res.message));
    },

    // 获取用户信息
    async userInfo(data: any) {
      const res: UserInfoResponseData = await reqUserInfo(data);

      if (res.code === 200) {
        this.username = res.data.username;
        this.avatar = res.data.avatar;
        this.btnArr = res.data.button;

        // 权限路由过滤
        const routeSet = new Set(res.data.routes);

        const asyncRoutes = filterAsRoute(cloneDeep(asnycRoute), routeSet);

        // 菜单
        this.routesMenu = [...constantRoutes, ...asyncRoutes, anyRoute];

        // 动态注册路由
        asyncRoutes.forEach((route: any) => {
          if (!router.hasRoute(route.name)) {
            router.addRoute(route);
          }
        });

        // 注册 404
        if (!router.hasRoute(anyRoute.name!)) {
          router.addRoute(anyRoute);
        }

        return "ok";
      }

      return Promise.reject(new Error(res.message));
    },

    // 退出登录
    async userLogOut(data: any) {
      const res = await reqLogout(data);

      if (res.code === 200) {
        this.username = "";
        this.avatar = "";
        this.token = "";
        this.routesMenu = constantRoutes;

        // 删除所有动态路由
        cloneDeep(asnycRoute).forEach((route: any) => {
          if (router.hasRoute(route.name)) {
            router.removeRoute(route.name);
          }
        });

        // 删除404路由
        if (router.hasRoute(anyRoute.name!)) {
          router.removeRoute(anyRoute.name!);
        }

        return "ok";
      }

      return Promise.reject(new Error(res.message));
    },
  },

  getters: {},
});

export default useUserStore;
