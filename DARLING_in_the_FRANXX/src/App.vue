<template>
  <div class="app">
    <deep-copy />
  </div>
</template>

<script setup lang="ts">
import DeepCopy from "./components/deepCopy.vue";

defineOptions({
  name: "App",
});
</script>

<style>
.app {
  background-color: tomato;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  padding: 10px;
}
</style>
