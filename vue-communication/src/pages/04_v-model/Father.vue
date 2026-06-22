<template>
  <div class="father">
    <h3>父组件</h3>
    <h1>{{ username }}</h1>
    <h1>{{ password }}</h1>
    <!-- 原生dom -->
    <!-- <input type="text" v-model="username" /> -->
    <!-- <input
      type="text"
      :value="username"
      @input="username = (<HTMLInputElement>$event.target).value"
    /> -->

    <!-- 组件 -->
    <!-- <JagerInput v-model="username" /> -->
    <!-- <JagerInput :modelValue="username" @update:modelValue="username = $event" /> -->

    <!-- 修改modelValue-->
    <JagerInput v-model:jojo="username" v-model:dio="password" />
  </div>
</template>

<script setup lang="ts" name="Father">
import { ref } from "vue";
import JagerInput from "./JagerInput.vue";
defineOptions({
  name: "Father",
});

let username = ref("ash");
let password = ref(123456);
</script>

<style scoped>
.father {
  padding: 20px;
  background-color: rgb(165, 164, 164);
  border-radius: 10px;
}
</style>
