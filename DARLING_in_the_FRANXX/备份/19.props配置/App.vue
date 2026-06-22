<template>
  <Person :personList="personList" />
</template>

<script lang="ts" setup>
import Person from "./components/Person.vue";
import { reactive } from "vue";
import type { Persons } from "./types";

defineOptions({
  name: "App",
});

let personList = reactive<Persons>([
  { id: "001", name: "张三", age: 18 },
  { id: "002", name: "李四", age: 22 },
  { id: "003", name: "王老五", age: 28 },
]);
</script>
