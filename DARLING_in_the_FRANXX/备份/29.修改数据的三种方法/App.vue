<template>
  <div class="app">
    <Count />
    <Talk />
  </div>
</template>

<script lang="ts" setup>
import Count from "./components/Count.vue";
import Talk from "./components/Talk.vue";

defineOptions({
  name: "App",
});
</script>

<style scoped></style>
