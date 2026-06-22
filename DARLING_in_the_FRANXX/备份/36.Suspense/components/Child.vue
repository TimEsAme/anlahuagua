<template>
  <div class="child">
    <h1>安拉花瓜</h1>
    <h2>当前求和为{{ sum }}</h2>
    <h2>{{ jojo }}</h2>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";

defineOptions({
  name: "App",
});

let sum = ref(0);

let res = await axios.get("https://v1.hitokoto.cn/");
const { hitokoto, from, from_who } = res.data;
const jojo = `${hitokoto}——${from_who ? from_who + " · " : ""}${from}`;
console.log(jojo);
</script>

<style scoped>
.child {
  background-color: turquoise;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  padding: 10px;
}
</style>
