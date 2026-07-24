<template>
  <div class="login-container">
    <div class="login-box">
      <h1>登录</h1>

      <form @submit.prevent="handleLogin">
        <input v-model="username" type="text" placeholder="用户名" />
        <input v-model="password" type="password" placeholder="密码" />
        <button type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<!-- pages/login.vue -->
<script setup lang="ts">
import { useUser } from "~/composables/useUser.ts";
// import { useUserStore } from "~/store/userStore.ts";
// const userStore = useUserStore();

definePageMeta({
  layout: false,
});

const { userinfo, login, logout } = useUser();
const username = ref("");
const password = ref("");

const handleLogin = async () => {
  // 这里写你的登录逻辑
  const userObj = { username: username.value, password: password.value };
  login(userObj);
  await navigateTo("/");
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 8px;
  width: 340px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 22px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

input {
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #4096ff;
}

button {
  padding: 10px;
  background: #4096ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
}

button:hover {
  background: #1677ff;
}
</style>
