<template>
  <div class="father">
    <h3>父组件</h3>
    <h1>房产:{{ house }}</h1>
    <button @click="changeToy1">修改child1的玩具</button>
    <button @click="changeToy2">修改child2的玩具</button>
    <button @click="getAllChild($refs)">爱上学习</button>
    <Child1 ref="c1" />
    <Child2 ref="c2" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Child1 from "./Child1.vue";
import Child2 from "./Child2.vue";
defineOptions({
  name: "Father",
});
let house = ref(4);
let c1 = ref();
let c2 = ref();

function changeToy1() {
  c1.value.toy = "nvo-228";
}
function changeToy2() {
  c2.value.toy = "vcr-2";
}
function getAllChild(refs: any) {
  // console.log(refs);
  for (let key in refs) {
    // console.log(refs[key]);
    refs[key].book += 2;
  }
}

defineExpose({ house });
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}

.father button {
  margin-bottom: 10px;
  margin-left: 10px;
}
button {
  margin-top: 10px;
}
</style>
