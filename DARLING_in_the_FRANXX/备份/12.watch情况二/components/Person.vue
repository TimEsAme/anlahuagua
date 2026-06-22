<template>
  <div class="person">
    <h1>姓名:{{ person.name }}</h1>
    <h1>年龄:{{ person.age }}</h1>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">换人</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

defineOptions({
  name: "Person",
});

let person = ref({
  name: "张三",
  age: 18,
});

function changeName() {
  person.value.name += "~";
}
function changeAge() {
  person.value.age++;
}
function changePerson() {
  person.value = {
    name: "李四",
    age: 19,
  };
}
// 监视
// 情况二:监视ref定义的对象类型数据
// 监视的是对象的地址,监视不到内部的属性,如果想就开启deep属性
// 监视对象的时候
// 改变对象内部的属性时,新旧value都是修改后的值,因为是同一个对象
// 改变整个对象时,新value是修改后的值,旧value是旧值,因为不是同一个对象
watch(
  person,
  (a, b) => {
    console.log(a, b);
  },
  {
    deep: true,
    immediate: true,
  },
);
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
