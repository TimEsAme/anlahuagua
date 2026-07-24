<template>
  <div>
    <h1>index</h1>
    <h2>身份:{{ userinfo.name }}</h2>
    <h2>{{ remainingTime }}</h2>
  </div>
</template>

<script setup>
// import { useUserStore } from "~/store/userStore.ts";
// const userStore = useUserStore();

const { userinfo } = useUser();

definePageMeta({
  layout: "default",
});

const time = new Date(Date.now() + 60 * 60 * 1000);
const { remainingTime } = useCountdown(time);
</script>

<style scoped></style>
