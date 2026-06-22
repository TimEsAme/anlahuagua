function isObject(val) {
  return typeof val === "object" && val !== null;
}

function isFunction(val) {
  return typeof val === "function";
}

function isThenable(x) {
  return (isObject(x) || isFunction(x)) && isFunction(x.then);
}

function rejectPromise(prom, reason) {
  if (prom._state !== "pending") return;

  prom._state = "rejected";
  prom._reason = reason;
}

function resolvePromise(prom, x) {
  if (prom._state !== "pending") {
    return;
  }
  if (isThenable(x)) {
    if (x === prom) {
      rejectPromise(
        prom,
        new TypeError(
          "TypeError:Chaining cycle detected for promise #<MyPromise>",
        ),
      );
      return;
    }
    queueMicrotask(() => {
      x.then(
        (data) => {
          resolvePromise(prom, data);
        },
        (err) => {
          rejectPromise(prom, err);
        },
      );
    });
  } else {
    prom._state = "fulfilled";
    prom._data = x;
  }
}

class MyPromise {
  // 'pending' | 'fulfilled' | 'rejected'
  _state = "pending";
  _data = undefined;
  _reason = undefined;

  constructor(executor) {
    const resolve = (data) => {
      resolvePromise(this, data);
    };
    const reject = (err) => {
      rejectPromise(this, err);
    };

    executor(resolve, reject);
  }
  then() { }
}

const p = new MyPromise((resolve, reject) => {
  // 成功
  resolve(111);
  // setTimeout(() => {
  //   resolve(p);
  // }, 1000);

  // 失败
  reject(222);
});

// setTimeout(() => {
//   console.log(p);
// }, 2000);
