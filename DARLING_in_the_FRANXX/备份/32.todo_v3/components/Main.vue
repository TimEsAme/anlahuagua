<template>
  <ul class="todo-main">
    <Item v-for="e in UltramanList" :key="e.id" :e="e" />
  </ul>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import Item from "./Item.vue";
import { useUltramanStore } from "@/store/Ultraman";

defineOptions({
  name: "Main",
});

const Ultraman = useUltramanStore();
const { UltramanList } = storeToRefs(Ultraman);
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
