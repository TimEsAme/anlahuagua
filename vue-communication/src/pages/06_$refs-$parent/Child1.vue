<template>
  <div class="child1">
    <h3>子组件1</h3>
    <h1>玩具:{{ toy }}</h1>
    <h1>书:{{ book }}</h1>
    <button @click="minusHouse($parent)">老登爆金币</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "Child1",
});

let toy = ref("ak47");
let book = ref(3);

function minusHouse(parent: any) {
  // console.log(parent);
  if (parent.house) parent.house -= 1;
}

defineExpose({
  toy,
  book,
});
</script>

<style scoped>
.child1 {
  margin-top: 20px;
  background-color: skyblue;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
