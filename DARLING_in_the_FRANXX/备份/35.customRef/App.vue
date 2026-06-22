<template>
  <div class="app">
    <h1>{{ jojo }}</h1>
    <input type="text" v-model="jojo" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useJojoRef from "./hooks/useJojoRef";
defineOptions({
  name: "App",
});

// let jojo = ref("安拉花瓜");
let { jojo } = useJojoRef("安拉花瓜", 500);
</script>

<style>
.app {
  background-color: tomato;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  padding: 10px;
}
button {
  margin-right: 5px;
}
</style>
