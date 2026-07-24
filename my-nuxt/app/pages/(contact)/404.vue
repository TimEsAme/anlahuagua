<template>
  <div>
    <div class="gun" @click="gun">你特么是管理员吗?你个傻屌!!!滚出去!!!</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const gun = async () => {
  await navigateTo("/login");
};
</script>

<style scoped>
.gun {
  width: 800px;
  height: 500px;
  background-color: tomato;
  color: teal;
  margin: 100px auto;
  font-size: 100px;
  cursor: pointer;
}
</style>
