<template>
  <div class="person">
    <h1>姓名:{{ person.name }}</h1>
    <h1>年龄:{{ person.age }}</h1>
    <h1>汽车:{{ person.car.c1 }},{{ person.car.c2 }}</h1>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">换第一台车</button>
    <button @click="changeC2">换第二台车</button>
    <button @click="changeCar">换车</button>
  </div>
</template>
<script lang="ts" setup>
import { handleError, reactive, watch } from "vue";

defineOptions({
  name: "Person",
});

let person = reactive({
  name: "张三",
  age: 18,
  car: {
    c1: "奔驰",
    c2: "宝马",
  },
});

function changeName() {
  person.name += "~";
}
function changeAge() {
  person.age++;
}
function changeC1() {
  person.car.c1 = "奥迪";
}
function changeC2() {
  person.car.c2 = "凯迪拉克";
}
function changeCar() {
  person.car = {
    c1: "极氪",
    c2: "领克",
  };
}

// 监视
// 情况五:监视多个数据
watch(
  [() => person.name, () => person.car],
  (a, b) => {
    console.log(a, b);
  },
  {
    deep: true,
  },
);

// 函数一把梭!!!!!!!
</script>

<style scoped>
.person {
  background-color: cadetblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 10px;
}
</style>
