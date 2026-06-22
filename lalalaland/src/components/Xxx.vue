<template>
  <div>
    <!-- <h1>{{ a }}</h1>
    <button @click="changeA('李四')">安拉花瓜</button> -->

    <!-- <h1>{{ modelA }}</h1>
    <button @click="changeModelA()">安拉花瓜</button> -->

    <!-- <h1>{{ a }}</h1>
    <button @click="emit('changeA', '李四')">安拉花瓜</button> -->
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "xxx",
});

// defineProps(["a", "changeA"]);

// const modelA = defineModel("jojo");
// const changeModelA = () => {
//   modelA.value = "李四";
// };

// defineProps(["a"]);
// const emit = defineEmits(["changeA"]);
</script>

<style scoped lang="scss"></style>
