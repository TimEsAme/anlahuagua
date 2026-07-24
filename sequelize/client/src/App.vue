<template>
  <div class="layout">
    <!-- 顶部导航 -->
    <header class="header">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/ash">Ash</RouterLink>

      <RouterLink class="login" v-if="!userStore.token" to="/login"
        >Login
      </RouterLink>
      <div class="jojo" @click="logOut" v-else>
        {{ (userStore.userInfo as any).loginId || "loading..." }}
      </div>
    </header>

    <!-- 页面内容 -->
    <main class="content">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from "vue-router";
import { useUserStore } from "./store/index";
const userStore = useUserStore();
const router = useRouter();
const logOut = () => {
  userStore.token = "";
  userStore.userInfo = {};
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<style scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f6f8;
}

.header {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.header a {
  margin-right: 12px;
  color: #555;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  transition: 0.2s;
}

.header a:hover {
  color: #409eff;
  background: #ecf5ff;
}

.router-link-active {
  color: #409eff !important;
  background: #ecf5ff;
}

.jojo {
  margin-left: auto;
  padding: 8px 18px;
  background: #f5f7fa;
  border-radius: 20px;
  color: #333;
  font-size: 14px;
}
.login {
  margin-left: auto;
}
.content {
  flex: 1;
  padding: 20px;
  overflow: hidden;
}
</style>
