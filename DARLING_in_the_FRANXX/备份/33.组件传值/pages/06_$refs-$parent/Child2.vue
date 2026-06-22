<template>
  <div class="child2">
    <h3>子组件2</h3>
    <h1>玩具:{{ toy }}</h1>
    <h1>书:{{ book }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "Child2",
});
let toy = ref("awm");
let book = ref(5);
defineExpose({ toy, book });
</script>

<style scoped>
.child2 {
  margin-top: 20px;
  background-color: orange;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
