<template>
  <div>
    <h1>page2</h1>
    <h2>身份:{{ userinfo.name }}</h2>
  </div>
</template>

<script setup>
// import { useUserStore } from "~/store/userStore.ts";
// const userStore = useUserStore();

const { userinfo } = useUser();
definePageMeta({
  layout: "default",
});
</script>

<style scoped></style>
