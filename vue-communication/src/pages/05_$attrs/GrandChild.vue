<template>
  <div class="grand-child">
    <h3>我是孙组件</h3>
    <h1>{{ a }}</h1>
    <h1>{{ b }}</h1>
    <h1>{{ c }}</h1>
    <h1>{{ d }}</h1>
    <h1>{{ x }}</h1>
    <h1>{{ y }}</h1>
    <button @click="changeEvnet(6)">修改</button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GrandChild",
});
defineProps(["a", "b", "c", "d", "x", "y", "changeEvnet"]);
</script>

<style scoped>
.grand-child {
  margin-top: 20px;
  background-color: orange;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
