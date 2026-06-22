<template>
  <div class="game">
    <h2>游戏列表</h2>
    <slot name="jojo" :games="games">安拉花瓜!!!</slot>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
defineOptions({
  name: "Game",
});

let games = reactive([
  { id: "001", name: "战地风云" },
  { id: "002", name: "生化危机" },
  { id: "002", name: "怪物猎人" },
  { id: "003", name: "英雄联盟" },
]);
</script>

<style scoped>
.game {
  width: 200px;
  height: 300px;
  background-color: skyblue;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
h2 {
  background-color: orange;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
</style>
