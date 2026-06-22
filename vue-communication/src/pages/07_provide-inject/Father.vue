<template>
  <div class="father">
    <h3>我是父组件</h3>
    <h1>银子:{{ money }}w</h1>
    <h1>车子:{{ car.brand }},价值{{ car.price }}w</h1>
    <Child />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import Child from "./Child.vue";
defineOptions({
  name: "Father",
});

let money = ref(1000);
let car = ref({
  brand: "福特猛禽",
  price: 100,
});
function useMoney(n: number) {
  money.value -= n;
}

// 不要.value,会丢失响应式
provide("money", { money, useMoney });
provide("car", car);
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
</style>
