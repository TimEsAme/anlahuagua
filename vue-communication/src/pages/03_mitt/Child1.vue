<template>
  <div class="child1">
    <h3>子组件1</h3>
    <h4>玩具:{{ toy }}</h4>
    <button @click="jojo.emit('get_gun', toy)">发把狙给小老弟</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import jojo from "@/utils/jojo";
defineOptions({
  name: "Child1",
});
let toy = ref("awm");
</script>

<style scoped>
.child1 {
  margin-top: 50px;
  background-color: skyblue;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
.child1 button {
  margin-right: 10px;
}
</style>
