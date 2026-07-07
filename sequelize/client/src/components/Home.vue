<template>
  <div>
    <div class="moveDiv" v-if="userStore.token">
      <h1>安拉花瓜!!!{{ userStore.userInfo.loginId }}</h1>
    </div>
    <div class="moveDiv" v-else>
      <h1 @click="move">滚去登录!!!</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../store";
const router = useRouter();
const userStore = useUserStore();

const move = () => {
  router.push("/login");
};
</script>

<style scoped>
.moveDiv {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  cursor: pointer;
}
</style>
