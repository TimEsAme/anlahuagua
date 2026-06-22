<template>
  <div class="app">
    <h1>求和为:{{ sum }}</h1>
    <h1>名字为:{{ person.name }}</h1>
    <h1>年龄为:{{ person.age }}</h1>
    <h1>
      汽车为{{ car.brand }},颜色为{{ car.options.color }},发动机是{{
        car.options.engine
      }}
    </h1>
    <button @click="changeEvent(1)">改和</button>
    <button @click="changeEvent(2)">改名字</button>
    <button @click="changeEvent(3)">改年龄</button>
    <button @click="changeEvent(4)">改人</button>
    <button @click="changeEvent(5)">换车</button>
    <button @click="changeEvent(6)">改颜色</button>
    <button @click="changeEvent(7)">换车!!!</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, shallowReactive, shallowRef } from "vue";

defineOptions({
  name: "App",
});

let sum = ref(0);
let person = ref({
  name: "张三",
  age: 18,
});

// let car = reactive({
//   brand: "道奇地狱猫",
//   options: {
//     color: "黑色",
//     engine: "v8",
//   },
// });

// 只有外层是响应式,内部属性没有响应式
// let person = shallowRef({
//   name: "张三",
//   age: 18,
// });

let car = shallowReactive({
  brand: "道奇地狱猫",
  options: {
    color: "黑色",
    engine: "v8",
  },
});

function changeEvent(n: number) {
  if (n === 1) {
    sum.value++;
  } else if (n === 2) {
    person.value.name = "李四";
  } else if (n === 3) {
    person.value.age++;
  } else if (n === 4) {
    person.value = {
      name: "安拉花瓜",
      age: 28,
    };
  } else if (n === 5) {
    car.brand = "福特猛禽";
  } else if (n === 6) {
    car.options.color = "棕色";
  } else if (n === 7) {
    Object.assign(car, {
      brand: "福特猛禽",
      options: {
        color: "沙漠色",
        engine: "v8",
      },
    });
  }
}
</script>

<style>
.app {
  background-color: tomato;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  padding: 10px;
}
button {
  margin-right: 5px;
}
</style>
