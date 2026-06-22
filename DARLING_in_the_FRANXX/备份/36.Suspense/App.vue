<template>
  <div class="app">
    <h1>我是APP</h1>
    <Suspense>
      <template #default>
        <child />
      </template>
      <template #fallback>
        <h2>安拉花瓜!!!</h2>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { Suspense } from "vue";
import Child from "./components/Child.vue";

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
