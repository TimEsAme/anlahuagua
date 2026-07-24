<template>
  <div>
    <header>
      <h1>anlahuagua!!!</h1>
      <nav>
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/about">关于</nuxt-link>
        <nuxt-link to="/jojo">jojo</nuxt-link>
        <nuxt-link to="/admin">管理</nuxt-link>
        <Dropdown />
        <button class="logout" @click="logoutEvent">退出</button>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import Dropdown from "~/components/Dropdown.vue";
// import { useUserStore } from "~/store/userStore.ts";
// const userStore = useUserStore();

const { logout } = useUser();
const logoutEvent = () => {
  logout();
};
</script>

<style scoped>
.default-layout {
  background: #f0f0f5;
  color: #333;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  background: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

header nav {
  margin-top: 10px;
}

header nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

header nav a:hover {
  text-decoration: underline;
}
</style>
