<template>
  <div class="child">
    <h3>子组件</h3>
    <!-- <h1>a:{{ a }}</h1>
    <h1>其他:{{ $attrs }}</h1> -->
    <GrandChild v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
import GrandChild from "./GrandChild.vue";
defineOptions({
  name: "Child",
});
// defineProps(["a"]);
</script>

<style scoped>
.child {
  margin-top: 20px;
  background-color: skyblue;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
