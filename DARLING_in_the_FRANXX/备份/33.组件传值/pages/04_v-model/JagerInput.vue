<template>
  <!-- 传统写法 -->
  <!-- <input
    type="text"
    :value="modelValue"
    @input="
      emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  /> -->
  <!-- 传统写法修改 modelValue -->
  <!-- <input
    type="text"
    :value="jojo"
    @input="emit('update:jojo', ($event.target as HTMLInputElement).value)"
  />
  <br />
  <input
    type="text"
    :value="dio"
    @input="emit('update:dio', ($event.target as HTMLInputElement).value)"
  /> -->

  <!-- 更新写法 -->
  <input type="text" v-model="model1" />
  <br />
  <input type="text" v-model="model2" />
</template>

<script setup lang="ts">
defineOptions({
  name: "JagerInput",
});
// 传统写法
// defineProps(["modelValue"]);
// const emit = defineEmits(["update:modelValue"]);

// 传统写法修改 modelValue,可以传递多个
// defineProps(["jojo", "dio"]);
// const emit = defineEmits(["update:jojo", "update:dio"]);

// 更新写法
const model1 = defineModel("jojo");
const model2 = defineModel("dio");
</script>

<style scoped>
input {
  border: 2px solid black;
  background-image: linear-gradient(45deg, red, yellow, green);
  height: 30px;
  font-size: 20px;
  color: white;
  margin-bottom: 5px;
}
</style>
