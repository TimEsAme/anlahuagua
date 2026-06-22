<template>
  <div v-if="errors.length">
    <h1>错误日志</h1>
    <ul>
      <li v-for="e in errors" :key="e.time">{{ e.time }} - {{ e.message }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "ErrorLogger",
});
import { onMounted, reactive } from "vue";

// 存放错误信息
const errors = reactive([]);

onMounted(() => {
  // 改写console.error方法
  // 后续使用时会自动把错误信息推到errors数组中

  // 存一下旧的error方法
  const oldConsoleError = console.error;
  console.error = (...args) => {
    // 把错误信息放进去
    errors.push({
      message: args[0],
      time: new Date().toDateString(),
    });
    // 再重新调用error方法
    oldConsoleError.apply(console, args);
  };
});
</script>
