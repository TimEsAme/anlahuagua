<template>
  <div class="grand-child">
    <h3>我是孙组件</h3>
    <h1>爷爷给的银子{{ money }}w</h1>
    <h1>爷爷给的车子:{{ car.brand }},价值{{ car.price }}w</h1>
    <button @click="useMoney(6)">花爷爷的钱</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

defineOptions({
  name: "FaGrandChildther",
});

let { money, useMoney } = inject("money", {
  money: 0,
  useMoney: (n: number) => {},
});
let car = inject("car", { brand: "未知", price: 0 });
</script>

<style scoped>
.grand-child {
  background-color: orange;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
