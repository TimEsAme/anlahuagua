<template>
  <div class="login">
    <ElRow>
      <ElCol :span="13" :xs="0"></ElCol>
      <ElCol :span="11" :xs="24">
        <ElForm class="login_form" ref="form" :model="loginForm" :rules="rules">
          <h1 class="login_title">Hello</h1>
          <h2 class="login_message">安拉花瓜!!!</h2>
          <ElFormItem prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </ElFormItem>
          <ElFormItem prop="password">
            <el-input
              v-model="loginForm.password"
              :prefix-icon="Lock"
              show-password
              type="password"
            ></el-input>
          </ElFormItem>
          <ElFormItem>
            <ElButton
              type="warning"
              :loading="flag"
              class="login_button"
              @click="loginEvent"
              >登录
            </ElButton>
          </ElFormItem>
        </ElForm>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import { ElCol, ElNotification, ElRow } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useUserStore from "@/store/modules/user";
import { useRoute, useRouter } from "vue-router";
import { getTime } from "@/utils/time";
const userstore = useUserStore();

const router = useRouter();
const route = useRoute();

let flag = ref(false);
let form = ref();

const loginForm = reactive({
  username: "admin",
  password: "123456",
});

const loginEvent = async () => {
  await form.value.validate();
  flag.value = true;

  try {
    await userstore.userLogin(loginForm);
    let redirect: any = route.query.redirect;
    router.push({ path: redirect || "/" });
    ElNotification({
      type: "success",
      title: "欢迎回来",
      message: `HI,${getTime()}`,
      duration: 2000,
    });
    flag.value = false;
  } catch (error) {
    flag.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
      duration: 2000,
    });
  }
};
const validateUsername = (_rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("用户名至少五位"));
  }
};
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码长度五位"));
  }
};

const rules = {
  username: [
    {
      trigger: "blur",
      validator: validateUsername,
    },
  ],
  password: [
    {
      trigger: "blur",
      validator: validatePassword,
    },
  ],
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/background\ .jpg") no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
  }
  .login_title {
    color: white;
    font-size: 150px;
  }
  .login_message {
    font-size: 80px;
    margin: 20px 0;
  }
  .login_button {
    width: 100%;
  }
}
</style>
