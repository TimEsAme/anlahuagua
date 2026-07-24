import { defineStore } from "pinia";

type user = {
  username: string;
  password: string;
};

export const useUserStore = defineStore("userStore", {
  state() {
    return {
      userinfo: {
        name: "",
      },
    };
  },
  actions: {
    login(user: user) {
      const token = useCookie("token");
      if (user.username === "admin" && user.password === "123456") {
        // 保存登录状态
        token.value = "admin-token";
        // 当前用户信息
        this.userinfo.name = "admin";
      } else {
        token.value = "user-token";
        this.userinfo.name = "whiteCaps";
      }
    },
    logout() {
      const token = useCookie("token");
      token.value = null;
      this.userinfo.name = "";
      navigateTo("/login");
    },
  },
});
