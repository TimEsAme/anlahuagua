<template>
  <div class="child">
    <h1>安拉花瓜</h1>
    <h2>当前求和为{{ sum }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "App",
});

let sum = ref(0);
</script>

<style scoped>
.child {
  background-color: turquoise;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  padding: 10px;
}
</style>
