<template>
  <div class="person">
    <h1>当前求和为{{ sum }}---放大之后{{ bigSum }}</h1>
    <button @click="add">点我+1</button>
    <hr />
    <img v-for="(e, i) in imgList" :key="i" :src="e" />
    <button @click="getDog">再来一只!!!</button>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: "Person",
});

import useSum from "@/hooks/useSum";
import useDog from "@/hooks/useDog";

const { sum, add, bigSum } = useSum();
const { imgList, getDog } = useDog();

// let imgList = reactive([
//   "https://images.dog.ceo/breeds/pembroke/n02113023_3167.jpg",
// ]);
// async function getDog() {
//   try {
//     let res = await axios.get(
//       "https://dog.ceo/api/breed/pembroke/images/random",
//     );
//     imgList.push(res.data.message);
//   } catch (error) {
//     alert(error);
//   }
// }

// let sum = ref(0);
// function add() {
//   sum.value++;
// }
</script>

<style scoped>
.person {
  background-color: teal;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 10px;
}

img {
  height: 200px;
  margin-right: 10px;
}
</style>
