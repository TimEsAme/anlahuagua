<template>
  <div class="about">
    <h2>安拉花瓜!!!</h2>
  </div>
</template>

<script setup lang="ts" name="About">
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  console.log("挂载了");
});

onUnmounted(() => {
  console.log("卸载了");
});
</script>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: rgb(85, 84, 84);
  font-size: 18px;
}
</style>
