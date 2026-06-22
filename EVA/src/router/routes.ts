// export const constantRoutes = [
//   // 登录
//   {
//     name: "login",
//     path: "/login",
//     component: () => import("@/views/Login/index.vue"),
//     meta: {
//       title: "登录",
//       show: false,
//     },
//   },
//   // layout
//   {
//     name: "layout",
//     path: "/",
//     component: () => import("@/layout/index.vue"),
//     redirect: "/home",
//     meta: {
//       title: "layout",
//       show: true,
//       icon: "StarFilled",
//     },
//     children: [
//       {
//         name: "home",
//         path: "/home",
//         component: () => import("@/views/Home/index.vue"),
//         meta: {
//           title: "首页",
//           show: true,
//           icon: "StarFilled",
//         },
//       },
//     ],
//   },
//   // 大屏
//   {
//     name: "screen",
//     path: "/screen",
//     component: () => import("@/views/Screen/index.vue"),
//     meta: {
//       title: "数据",
//       show: true,
//       icon: "StarFilled",
//     },
//   },
//   // 权限管理
//   {
//     name: "acl",
//     path: "/acl",
//     component: () => import("@/layout/index.vue"),
//     meta: {
//       title: "权限管理",
//       show: true,
//       icon: "StarFilled",
//     },
//     children: [
//       {
//         name: "permission",
//         path: "/acl/permission",
//         component: () => import("@/views/Acl/Permission.vue"),
//         meta: {
//           title: "菜单管理",
//           show: true,
//           icon: "StarFilled",
//         },
//       },
//       {
//         name: "role",
//         path: "/acl/role",
//         component: () => import("@/views/Acl/Role.vue"),
//         meta: {
//           title: "角色管理",
//           show: true,
//           icon: "StarFilled",
//         },
//       },
//       {
//         name: "user",
//         path: "/acl/user",
//         component: () => import("@/views/Acl/User.vue"),
//         meta: {
//           title: "用户管理",
//           show: true,
//           icon: "StarFilled",
//         },
//       },
//     ],
//   },
//   // 商品管理
//   {
//     name: "product",
//     path: "/product",
//     component: () => import("@/layout/index.vue"),
//     meta: {
//       title: "商品管理",
//       show: true,
//       icon: "StarFilled",
//     },
//     children: [
//       {
//         name: "trademark",
//         path: "/product/trademark",
//         component: () => import("@/views/Product/TradeMark.vue"),
//         meta: {
//           title: "品牌管理",
//           show: true,
//           icon: "StarFilled",
//         },
//       },
//       {
//         name: "attr",
//         path: "/product/attr",
//         component: () => import("@/views/Product/Attr.vue"),
//         meta: {
//           title: "属性管理",
//           show: true,
//           icon: "StarFilled",
//         },
//       },
//       {
//         name: "sku",
//         path: "/product/sku",
//         component: () => import("@/views/Product/Sku.vue"),
//         meta: {
//           title: "SKU管理",
//           show: true,
//           icon: "StarFilled",
//         },
//       },
//       {
//         name: "spu",
//         path: "/product/spu",
//         component: () => import("@/views/Product/Spu.vue"),
//         meta: {
//           title: "SPU管理",
//           show: true,
//           icon: "StarFilled",
//         },
//       },
//     ],
//   },
//   // 404
//   {
//     name: "404",
//     path: "/404",
//     component: () => import("@/views/404/index.vue"),
//     meta: {
//       title: "404",
//       show: false,
//     },
//   },
//   // 任意路由
//   {
//     name: "anlahuagua",
//     path: "/:pathMatch(.*)*",
//     redirect: "/404",
//     meta: {
//       title: "安拉花瓜",
//       show: false,
//     },
//   },
// ];
export const constantRoutes = [
  // 登录
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      title: "登录",
      show: false,
    },
  },
  // layout
  {
    name: "layout",
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    meta: {
      title: "layout",
      show: true,
      icon: "StarFilled",
    },
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import("@/views/Home/index.vue"),
        meta: {
          title: "首页",
          show: true,
          icon: "StarFilled",
        },
      },
    ],
  },
  // 404
  {
    name: "404",
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      show: false,
    },
  },
  // 大屏
  {
    name: "Screen",
    path: "/screen",
    component: () => import("@/views/Screen/index.vue"),
    meta: {
      title: "数据",
      show: true,
      icon: "StarFilled",
    },
  },
];
export const asnycRoute = [
  // 权限管理
  {
    name: "Acl",
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "权限管理",
      show: true,
      icon: "StarFilled",
    },
    children: [
      {
        name: "User",
        path: "/acl/user",
        component: () => import("@/views/Acl/User.vue"),
        meta: {
          title: "用户管理",
          show: true,
          icon: "StarFilled",
        },
      },
      {
        name: "Role",
        path: "/acl/role",
        component: () => import("@/views/Acl/Role.vue"),
        meta: {
          title: "角色管理",
          show: true,
          icon: "StarFilled",
        },
      },
      {
        name: "Permission",
        path: "/acl/permission",
        component: () => import("@/views/Acl/Permission.vue"),
        meta: {
          title: "菜单管理",
          show: true,
          icon: "StarFilled",
        },
      },
    ],
  },
  // 商品管理
  {
    name: "Product",
    path: "/product",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "商品管理",
      show: true,
      icon: "StarFilled",
    },
    children: [
      {
        name: "Trademark",
        path: "/product/trademark",
        component: () => import("@/views/Product/TradeMark.vue"),
        meta: {
          title: "品牌管理",
          show: true,
          icon: "StarFilled",
        },
      },
      {
        name: "Attr",
        path: "/product/attr",
        component: () => import("@/views/Product/Attr.vue"),
        meta: {
          title: "属性管理",
          show: true,
          icon: "StarFilled",
        },
      },
      {
        name: "Spu",
        path: "/product/spu",
        component: () => import("@/views/Product/Spu.vue"),
        meta: {
          title: "SPU管理",
          show: true,
          icon: "StarFilled",
        },
      },
      {
        name: "Sku",
        path: "/product/sku",
        component: () => import("@/views/Product/Sku.vue"),
        meta: {
          title: "SKU管理",
          show: true,
          icon: "StarFilled",
        },
      },
    ],
  },
];

export const anyRoute = {
  // 任意路由
  name: "anlahuagua",
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  meta: {
    title: "安拉花瓜",
    show: false,
  },
};
