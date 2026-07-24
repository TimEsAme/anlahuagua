type user = {
  username: string;
  password: string;
};

export const useUser = () => {
  const userinfo = useState("userinfo", () => ({
    name: "",
  }));

  const token = useCookie("token");

  function login(user: user) {
    if (user.username === "admin" && user.password === "123456") {
      // 保存登录状态
      token.value = "admin-token";
      // 当前用户信息
      userinfo.value.name = "admin";
    } else {
      token.value = "user-token";
      userinfo.value.name = "whiteCaps";
    }
  }

  function logout() {
    token.value = null;
    userinfo.value.name = "";
    navigateTo("/login");
  }

  return {
    userinfo,
    login,
    logout,
  };
};
