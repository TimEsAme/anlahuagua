<template>
  <div class="person">
    <h1>来自{{ jojo.country }}的{{ jojo.codeName }}小队</h1>
    <button @click="changeCode">修改代号</button>
    <br />
    <h1>游戏列表</h1>
    <ul>
      <li v-for="e in game" :key="e.id">{{ e.name }}</li>
    </ul>
    <button @click="changeGame">修改游戏</button>
    <br />
    <h1>{{ obj.a.b.c }}</h1>
    <button @click="change">测试</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

defineOptions({
  name: "App",
});

let jojo = reactive({
  codeName: "郊狼",
  country: "德国",
});
function changeCode() {
  jojo.codeName = "323";
}

let game = reactive([
  { id: "001", name: "战地风云" },
  { id: "002", name: "英雄联盟" },
  { id: "003", name: "生化危机" },
]);

function changeGame() {
  game[0]!.name = "战神";
}

let obj = reactive({
  a: {
    b: {
      c: 333,
    },
  },
});
function change() {
  obj.a.b.c = 999;
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
