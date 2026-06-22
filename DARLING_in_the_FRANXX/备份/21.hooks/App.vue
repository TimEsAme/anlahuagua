<template>
  <Person />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Person from "./components/Person.vue";

defineOptions({
  name: "App",
});
</script>
