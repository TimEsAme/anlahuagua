function isObj(val) {
  return typeof val === "object" && val !== null;
}

class RefImpl {
  constructor(value) {
    this._value = isObj(value) ? reactive(value) : value;
  }

  get value() {
    console.log("拦截value的get操作");
    return this._value;
  }
  set value(newVal) {
    console.log("拦截到value的set操作");
    this._value = newVal;
  }
}

const proxyMap = new WeakMap();

function deepProxy(obj) {

  if (proxyMap.has(obj)) {
    return proxyMap.get(obj);
  }

  const res = new Proxy(obj, {
    get(target, key) {
      console.log(`拦截到${key}的get操作`);

      const res = Reflect.get(target, key, receiver);

      if (isObj(res)) {
        return deepProxy(res);
      }

      return res;
    },
    set(target, key, value) {
      console.log(`拦截到${key}的set操作`);
      return Reflect.set(target, key, value, receiver);
    },
    deleteProperty(target, key) {
      console.log(`拦截到${key}的delete操作`);
      return Reflect.deleteProperty(target, key);
    },

  });

  proxyMap.set(obj, proxy);

  return proxy;

}

function reactive(obj) {
  return deepProxy(obj);
}

function ref(value) {
  return new RefImpl(value);
}

// // let jojo = ref(10086);
// // console.log(jojo.value);

// let dio = ref({ jojo: 1 });
// dio.value.x = 10000;

let a = ref({ b: 1 });
const k = a.value;
console.log(k);
