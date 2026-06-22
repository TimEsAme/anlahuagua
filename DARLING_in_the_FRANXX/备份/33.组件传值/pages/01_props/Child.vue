<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>玩具:{{ toy }}</h4>
    <h4>父亲给的车:{{ car }}</h4>
    <button @click="getToy(toy)">给爹玩一手玩具</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
defineOptions({
  name: "Child",
});
let toy = ref("ak47");
defineProps(["car", "getToy"]);
</script>

<style scoped>
.child {
  background-color: skyblue;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
