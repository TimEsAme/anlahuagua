<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>玩具:{{ toy }}</h4>
    <button @click="emit('get_toy', toy)">给爹发把枪</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
defineOptions({
  name: "Child",
});

let toy = ref("ak47");
// 声明事件
let emit = defineEmits(["get_toy"]);
</script>

<style scoped>
.child {
  margin-top: 10px;
  background-color: rgb(76, 209, 76);
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
