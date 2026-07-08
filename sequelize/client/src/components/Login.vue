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
import { ref } from "vue";
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
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #f0f2f5;
}

.login-box {
  width: 360px;

  padding: 40px;

  background: #fff;

  border-radius: 8px;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;

  font-size: 26px;
  font-weight: 600;

  color: #333;

  margin-bottom: 30px;
}

/* 输入框 */
.form-group {
  margin-bottom: 18px;
}

.input-field {
  width: 100%;

  height: 42px;

  padding: 0 12px;

  border: 1px solid #ddd;

  border-radius: 5px;

  font-size: 14px;

  outline: none;

  transition: 0.2s;
}

.input-field:focus {
  border-color: #409eff;
}

/* 登录按钮 */
.login-btn {
  width: 100%;

  height: 42px;

  margin-top: 10px;

  border: none;

  border-radius: 5px;

  background: #409eff;

  color: white;

  font-size: 16px;

  cursor: pointer;

  transition: 0.2s;
}

.login-btn:hover {
  background: #66b1ff;
}
</style>
