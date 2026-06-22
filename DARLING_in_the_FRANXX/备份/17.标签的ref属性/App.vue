<template>
  <Person ref="jojo" />
  <button @click="showMe">测试</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Person from "./components/Person.vue";
defineOptions({
  name: "App",
});

let jojo = ref();
function showMe() {
  console.log(jojo.value);
}
</script>

<style></style>
