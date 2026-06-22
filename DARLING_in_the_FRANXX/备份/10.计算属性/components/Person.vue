<template>
  <div class="person">
    姓: <input type="text" v-model="ash" />
    <br />
    名: <input type="text" v-model="jojo" />
    <br />
    全名: <span>{{ jager }}</span>
    <button @click="change">改全名</button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Person",
});

import { computed, ref } from "vue";

let ash = ref("zhang");
let jojo = ref("san");

// 计算属性有缓存,没发生更改多次使用不会重复调用
// 这么写是只读
// let jager = computed(() => {
//   return (
//     ash.value.slice(0, 1).toUpperCase() + ash.value.slice(1) + "-" + jojo.value
//   );
// });

// 这么写可读可写
let jager = computed({
  get() {
    return (
      ash.value.slice(0, 1).toUpperCase() +
      ash.value.slice(1) +
      "-" +
      jojo.value
    );
  },
  set(val) {
    const [a, b] = val.split("-");
    ash.value = a!;
    jojo.value = b!;
  },
});

function change() {
  jager.value = "li-si";
}
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
