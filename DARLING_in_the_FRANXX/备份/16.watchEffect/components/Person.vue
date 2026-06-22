<template>
  <div class="person">
    <h1>当前水温{{ temp }}°C</h1>
    <h1>当前水位{{ hei }}cm</h1>
    <button @click="changeTemp">水温+10</button>
    <button @click="changeHei">水位+10</button>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";

defineOptions({
  name: "Person",
});

let temp = ref(10);
let hei = ref(0);

function changeTemp() {
  temp.value += 10;
}
function changeHei() {
  hei.value += 10;
}

// watch([temp, hei], (value) => {
//   let [newTemp, newHei] = value;
//   if (newTemp >= 60 || newHei >= 80) {
//     console.log("安拉花瓜");
//   }
// });

// watchEffect 不用指出监视的数据
// 里面用哪些就监视哪些
watchEffect(() => {
  if (temp.value >= 60 || hei.value >= 80) {
    console.log("安拉花瓜");
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
