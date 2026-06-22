<template>
  <div class="person">
    <h1>当前求和为:{{ sum }}</h1>
    <button @click="add">点我+1</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

defineOptions({
  name: "Person",
});

let sum = ref(0);
function add() {
  sum.value++;
}

// 情况一:监视ref定义的基本类型数据
const stopWatch = watch(sum, (a, b) => {
  console.log(a, b);
  if (sum.value >= 10) {
    stopWatch();
  }
});
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
