import { reactive } from "./reactive.js";
import { effect } from "./effect/effect.js";
import { computed } from "./computed.js";
import { RAW } from "./utils.js";

// // const dio = {
// //   a: 1,
// //   b: 2,
// //   c: {
// //     name: "张三",
// //     age: 18,
// //   },
// // };
// // const jojo = reactive(dio);
// // jojo.a;
// // jojo.b = 10086;
// // jojo.d = 3;
// // delete jojo.a;
// // "a" in jojo;
// // for (const key in jojo) {
// // }
// // const jojo = reactive([1, dio, 2]);
// // const r = jojo.includes(2);
// // const r = jojo.includes(dio);
// // jojo[5] = 10086;
// // console.log(jojo.length);
// // jojo.length = 10;
// // jojo.length = 1;

// const jager = {
//   a: 1,
//   b: 2,
// };

// const mikasa = reactive(jager);

// function fn() {
//   console.log("安拉花瓜");
//   mikasa.a++;
// }

// let isRun = false;
// const armin = effect(fn, {
//   lazy: true,
//   scheduler: (eff) => {
//     Promise.resolve().then(() => {
//       if (!isRun) {
//         isRun = true;
//         eff();
//       }
//     });
//   },
// });
// armin();
// mikasa.a += 100;
// mikasa.a += 100;
// mikasa.a += 100;
// mikasa.a += 100;
// mikasa.a += 100;
// mikasa.a += 100;

const state = reactive({
  a: 1,
  b: 2,
});

// let x = effect(() => {
//   return state.a + state.b;
// });
// console.log(x());
// state.a = 10086;
// console.log(x());

const sum = computed(() => {
  console.log("安拉花瓜");
  return state.a + state.b;
});

console.log(sum.value);

// console.log(sum.value);
// state.a = 10086;

// console.log(sum.value);
// console.log(sum.value);
// console.log(sum.value);
// console.log(sum.value);
// console.log(sum.value);

// state.a = 10086;
// console.log(sum.value);

// effect(() => {
//   console.log("wdnmd", sum.value);
// });

// state.a = 10086;
