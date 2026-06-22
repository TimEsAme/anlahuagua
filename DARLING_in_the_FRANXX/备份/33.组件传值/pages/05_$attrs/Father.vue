<template>
  <div class="father">
    <h3>父组件</h3>
    <h1>{{ a }}</h1>
    <h1>{{ b }}</h1>
    <h1>{{ c }}</h1>
    <h1>{{ d }}</h1>
    <Child
      :a="a"
      :b="b"
      :c="c"
      :d="d"
      v-bind="{ x: 100, y: 200 }"
      :changeEvnet="changeEvnet"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Child from "./Child.vue";
defineOptions({
  name: "Father",
});

let a = ref(1);
let b = ref(2);
let c = ref(3);
let d = ref(4);
function changeEvnet(v: any) {
  // console.log(v);
  a.value += v;
}
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
</style>
