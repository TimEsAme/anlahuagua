<template>
  <div class="person">
    <h1>来自{{ jojo.country }}的{{ jojo.codeName }}小队</h1>
    <button @click="changeCode">修改代号</button>
    <button @click="changeCountry">修改国家</button>
    <button @click="changeJojo">换人!!!</button>
    <hr />
    <h1>当前求和为:{{ num }}</h1>
    <button @click="add">点我加一</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

defineOptions({
  name: "App",
});

// let jojo = reactive({
//   codeName: "郊狼",
//   country: "德国",
// });
let jojo = ref({
  codeName: "郊狼",
  country: "德国",
});
function changeCode() {
  jojo.value.codeName = "323";
}
function changeCountry() {
  jojo.value.country = "阿美莉卡";
}
function changeJojo() {
  // 直接赋值丢失响应式
  // jojo = {
  //   codeName: "沙漠蝗虫",
  //   country: "埃及",
  // };

  // reactive定义的这么改
  // Object.assign(jojo, { codeName: "沙漠蝗虫", country: "埃及" });

  // ref定义的直接赋值
  jojo.value = { codeName: "沙漠蝗虫", country: "埃及" };
}

let num = ref(0);
function add() {
  num.value++;
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
