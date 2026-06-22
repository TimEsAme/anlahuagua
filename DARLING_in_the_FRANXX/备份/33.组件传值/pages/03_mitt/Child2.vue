<template>
  <div class="child2">
    <h3>子组件2</h3>
    <h4>玩具:{{ toy }}</h4>
    <h4 v-if="gun">狙:{{ gun }}</h4>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import jojo from "@/utils/jojo";

defineOptions({
  name: "Child2",
});
let toy = ref("nvo-228");
let gun = ref("");
jojo.on("get_gun", (value: any) => {
  gun.value = value;
});

onUnmounted(() => {
  jojo.off("get_gun");
});
</script>

<style scoped>
.child2 {
  margin-top: 50px;
  background-color: orange;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
