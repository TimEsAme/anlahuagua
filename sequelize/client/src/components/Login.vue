<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="title">安拉花瓜</h1>
      <div class="form-group">
        <input
          v-model="loginId"
          type="text"
          placeholder="用户名"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <input
          v-model="loginPwd"
          type="password"
          placeholder="密码"
          class="input-field"
        />
      </div>
      <button @click="loginEvent" class="login-btn">登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useUserStore } from "../store";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();

let loginId = ref("");
let loginPwd = ref("");

const loginEvent = async () => {
  try {
    await userStore.userLogin(loginId.value, loginPwd.value);
    router.push("/");
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.login-box {
  background: #ffffff;
  padding: 48px 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
}

.title {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 32px;
  letter-spacing: 2px;
}

.form-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 15px;
  color: #333;
  background: #fafafa;
  transition: border-color 0.2s;
  outline: none;
}

.input-field:focus {
  border-color: #409eff;
  background: #ffffff;
}

.input-field::placeholder {
  color: #bfbfbf;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #409eff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}

.login-btn:hover {
  background: #66b1ff;
}

.login-btn:active {
  background: #3a8ee6;
}
</style>
