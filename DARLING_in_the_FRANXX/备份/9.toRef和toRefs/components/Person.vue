<template>
  <div class="person">
    <h1>姓名:{{ jojo.name }}</h1>
    <h1>年龄:{{ jojo.age }}</h1>
    <hr />
    <h1>姓名:{{ name }}</h1>
    <h1>年龄:{{ age }}</h1>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRef, toRefs } from "vue";

defineOptions({
  name: "Person",
});

let jojo = reactive({
  name: "郊狼",
  age: 18,
});

// 直接解构没有响应式
// let { name, age } = jojo;

// 使用toRef,toRefs才能让数据具有响应式,并且原数据jojo也会修改
// let x = toRef(jojo, "name");
let { name, age } = toRefs(jojo);

function changeName() {
  // jojo.name += "~";
  name.value += "~";
}
function changeAge() {
  // jojo.age++;
  age.value++;
}
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
