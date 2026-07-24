// import { useUserStore } from "~/store/userStore.ts";

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token");
  const { userinfo } = useUser();

  // const userStore = useUserStore();

  // if (to.path === "/login") {
  //   if (token.value) {
  //     return navigateTo("/");
  //   }
  //   return;
  // }

  // // 检查 token 是否存在
  // if (!token.value) {
  //   return navigateTo("/login");
  // } else {
  //   // 模拟根据token恢复用户信息
  //   if (token.value === "admin-token") {
  //     userStore.userinfo.name = "admin";
  //   } else {
  //     userStore.userinfo.name = "whiteCaps";
  //   }
  // }

  if (token.value) {
    // 根据token恢复用户
    if (token.value === "admin-token") {
      userinfo.value.name = "admin";
    } else {
      userinfo.value.name = "whiteCaps";
    }
    // 已登录不能进入登录页
    if (to.path === "/login") {
      return navigateTo("/");
    }
    if (to.path === "/admin" && userinfo.value.name !== "admin") {
      return navigateTo("/404");
    }
    return;
  }

  // 没token
  if (to.path !== "/login") {
    return navigateTo("/login");
  }
});
