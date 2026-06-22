// 保存依赖函数
let ash = null;
// 保存依赖关系
const xMap = new Map();
const effectStack = [];

function track(target, key) {
  // 判断一下有没有副作用函数,没有就直接返回
  if (ash) {
    // 从map对象中获取依赖集合
    let xs = xMap.get(key);
    // 判断一下有没有依赖集合
    if (!xs) {
      xs = new Set();
      // 如果没有就创建一个新的依赖集合，并且放到map对象中
      xMap.set(key, xs);
    }
    // 将当前函数添加到依赖集合中
    xs.add(ash);

    // 把当前依赖集合添加到函数的收集依赖数组中
    ash.deps.push(xs);

    // 输出一下map对象，看看收集了哪些依赖
  }
  console.log(xMap, "xxxxxxxxxxxxxxxx");
  // console.log(ash.deps, "yyyyyyyyyyyyyyyy");
}

// 派发更新函数
function trigger(target, key, value) {
  // 运行依赖函数
  const xs = xMap.get(key);
  if (xs) {
    const xss = new Set(xs);
    xss.forEach((fn) => fn());
  }
}

const jojo = {
  a: "jojo",
  b: 18,
  c: "男",
};

const dio = new Proxy(jojo, {
  get(target, key) {
    // 收集依赖
    track(target, key);

    // 返回对象属性值
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    const res = Reflect.set(target, key, value);
    // 派发更新
    trigger(target, key, value);
    // 设置对象属性值
    return res;
  },
});

function cleanup(a) {
  const deps = a.deps;
  if (deps.length) {
    deps.forEach((xs) => {
      xs.delete(a);
      //   如果这个集合空了就从map里面删除
      if (xs.size === 0) {
        for (let [key, value] of xMap) {
          if (value === xs) {
            xMap.delete(key);
          }
        }
      }
    });
  }
  deps.length = 0;
}

/**
 *
 * @param {*} fn 回调函数
 */
function effect(fn) {
  const a = () => {
    ash = a;
    effectStack.push(a);
    cleanup(a);
    fn();
    // ash = null;
    effectStack.pop();
    ash = effectStack[effectStack.length - 1];
  };
  // 用来记录副作用函数的依赖集合
  a.deps = [];
  a();

  //   // 记录副作用函数
  //   ash = fn;
  //   // 执行副作用函数
  //   fn();
  //   // 置空副作用函数
  //   ash = null;
}

effect(() => {
  //   // 访问了 dio.name 属性，触发了 get 拦截器，收集了依赖
  //   console.log("安拉花瓜!!!");
  //   console.log(dio.name);
  //   console.log("安拉花瓜!!!");
  //   if (dio.name === "jojo") {
  //     dio.age;
  //   } else {
  //     dio.gender;
  //   }

  if (dio.a === "jojo") {
    dio.b;
  } else {
    dio.c;
  }
});

// effect(() => {
//   dio.a;
//   dio.c;
// });

dio.a = "赛文";
