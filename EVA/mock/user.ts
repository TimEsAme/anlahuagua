//createUserList:次函数执行会返回一个数组,数组里面包含两个用户信息
function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "admin",
      password: "123456",
      desc: "超级管理员",

      roles: ["超级管理员"],

      routes: [
        "",
        "Acl",
        "User",
        "Role",
        "Permission",
        "Product",
        "Category",
        "Attr",
        "Trademark",
        "Spu",
        "Sku",
      ],
      button: [
        "btn.User.add",
        "btn.User.remove",
        "btn.User.update",
        "btn.Role.add",
        "btn.Role.remove",
        "btn.Role.update",
        "btn.Permission.add",
        "btn.Permission.remove",
        "btn.Permission.update",
        "btn.Category.add",
        "btn.Category.remove",
        "btn.Category.update",
        "btn.Attr.add",
        "btn.Attr.remove",
        "btn.Attr.update",
        "btn.Spu.add",
        "btn.Spu.remove",
        "btn.Spu.update",
        "btn.Sku.add",
        "btn.Sku.remove",
        "btn.Sku.update",
      ],
      token: "Admin Token",
    },

    {
      userId: 2,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "manager1",
      password: "123456",
      desc: "权限管理员1",

      roles: ["权限管理员1"],

      routes: ["home", "Acl", "User", "Role", "Permission"],
      button: [
        "btn.User.add",
        "btn.User.remove",
        "btn.User.update",
        "btn.Role.add",
        "btn.Role.remove",
        "btn.Role.update",
      ],
      token: "Manager1 Token",
    },

    {
      userId: 3,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "manager2",
      password: "123456",
      desc: "权限管理员2",

      roles: ["权限管理员2"],

      routes: ["home", "Acl", "User", "Role", "Permission"],
      button: [
        "btn.User.add",
        "btn.User.remove",
        "btn.User.update",
        "btn.Role.add",
        "btn.Role.remove",
        "btn.Role.update",
        "btn.Permission.add",
        "btn.Permission.remove",
        "btn.Permission.update",
      ],
      token: "Manager2 Token",
    },

    {
      userId: 4,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "system1",
      password: "123456",
      desc: "商品管理员1",

      roles: ["商品管理员1"],
      button: [
        "btn.Category.add",
        "btn.Category.remove",
        "btn.Category.update",
        "btn.Attr.add",
        "btn.Attr.remove",
        "btn.Attr.update",
      ],
      routes: ["home", "Product", "Trademark", "Attr", "Spu", "Sku"],

      token: "System1 Token",
    },

    {
      userId: 5,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "system2",
      password: "123456",
      desc: "商品管理员2",

      roles: ["商品管理员2"],
      button: [
        "btn.Spu.add",
        "btn.Spu.remove",
        "btn.Spu.update",
        "btn.Sku.add",
        "btn.Sku.remove",
        "btn.Sku.update",
      ],
      routes: ["home", "Product", "Trademark", "Attr", "Spu", "Sku"],

      token: "System2 Token",
    },
  ];
}
//对外暴露一个数组:数组里面包含两个接口
//登录假的接口
//获取用户信息的假的接口
export default [
  // 用户登录接口
  {
    url: "/api/admin/acl/index/login", //请求地址
    method: "post", //请求方式
    response: ({ body }: { body: any }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body;
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      );
      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, data: { message: "账号或者密码不正确" } };
      }
      //如果有返回成功信息
      const { token } = checkUser;
      return { code: 200, data: { token } };
    },
  },
  // 获取用户信息
  {
    url: "/api/admin/acl/index/info",
    method: "get",
    response: (request: any) => {
      //获取请求头携带token
      const token = request.headers.token;

      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token);
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: "获取用户信息失败" } };
      }
      //如果有返回成功信息
      return { code: 200, data: { ...checkUser } };
    },
  },
  {
    url: "/api/admin/acl/index/logout",
    method: "post",
    response: () => {
      return {
        code: 200,
        data: "success",
      };
    },
  },
];
