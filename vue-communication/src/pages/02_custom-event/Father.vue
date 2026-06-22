<template>
  <div class="father">
    <h3>父组件</h3>
    <h4 v-if="toy">儿子给的玩具{{ toy }}</h4>
    <!-- 定义事件 -->
    <Child @get_toy="getToy" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Child from "./Child.vue";
defineOptions({
  name: "Father",
});

let toy = ref("");
function getToy(value: string) {
  toy.value = value;
}
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
.father button {
  margin-right: 5px;
}
</style>
