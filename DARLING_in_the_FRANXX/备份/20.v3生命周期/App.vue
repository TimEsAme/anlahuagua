<template>
  <Person v-if="show" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Person from "./components/Person.vue";

defineOptions({
  name: "App",
});

// 挂载完毕
onMounted(() => {
  console.log("父------挂载完毕");
});

let show = ref(true);
</script>
