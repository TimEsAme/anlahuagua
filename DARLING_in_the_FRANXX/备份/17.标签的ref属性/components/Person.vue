<template>
  <div class="person">
    <h1>安拉花瓜!</h1>
    <h1>安拉花瓜!!</h1>
    <h1 ref="whiteCap">安拉花瓜!!!</h1>
    <button @click="show">点我输出h1元素</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "Person",
});

let whiteCap = ref();
let a = ref("郊狼");
let b = ref("夜枭");

function show() {
  console.log(whiteCap.value);
}

// 子组件必须暴露出去数据父组件才能看到
defineExpose({ a, b });
</script>

<style scoped>
.person {
  background-color: cadetblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 10px;
}
</style>
