<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>汽车:{{ car }}</h4>
    <h4 v-if="toy">儿子给的玩具:{{ toy }}</h4>
    <Child :car="car" :getToy="getToy" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Child from "./Child.vue";
defineOptions({
  name: "Father",
});
let car = ref("凯雷德");
let toy = ref("");

function getToy(value: string) {
  // console.log(value);
  toy.value = value;
}
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
</style>
