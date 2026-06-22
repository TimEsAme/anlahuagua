<template>
  <div class="count">
    <h1>当前求和:{{ sum }}</h1>
    <h1>当前放大10倍:{{ bigSum }}</h1>
    <h1>jojo!!!:{{ jojoSum }}</h1>
    <h1>{{ map }}---{{ conutry }}</h1>
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
import { storeToRefs } from "pinia";

const countStore = useCountStore();
// 解构pinia里面的数据时,用storeToRefs
const { sum, map, conutry, bigSum, jojoSum } = storeToRefs(countStore);

defineOptions({
  name: "Count",
});

let n = ref(1);

function jager() {
  // 第一种修改方式直接改
  // countStore.sum += n.value;
  // 第二种修改方式批量改;
  // countStore.$patch({
  //   sum: 1,
  //   map: "开罗围城",
  //   conutry: "埃及",
  // });
  // 第三种修改方式
  countStore.mikasa(n.value);
}
function ash() {
  countStore.sum -= n.value;
}
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
