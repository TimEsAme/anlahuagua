<template>
  <div class="count">
    <h1>当前求和:{{ countStore.sum }}</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="jager">加</button>
    <button @click="ash">减</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCountStore } from "@/store/count";

const countStore = useCountStore();

defineOptions({
  name: "Count",
});

let n = ref(1);

function jager() {
  // 第一种修改方式直接改
  // countStore.sum += n.value;
  // 第二种修改方式批量改
  // countStore.$patch({
  //   sum: 1,
  //   sum1: 2,
  //   sum2: 3,
  // });
  // 第三种修改方式
  countStore.mikasa(n.value);
}
function ash() {}
</script>

<style scoped>
.count {
  background-color: tomato;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  margin-bottom: 2ch;
}
select,
button {
  margin: 0 5px;
  height: 25px;
}
</style>
