<template>
  <div class="default-layout">
    <header>
      <h1>安拉花瓜!!!</h1>
      <nav>
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/about">关于</NuxtLink>
        <NuxtLink to="/jojo">jojo</NuxtLink>
        <NuxtLink to="/admin">管理</NuxtLink>
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
.admin-layout {
  background: #1e1e2f;
  color: #cfd8dc;
  font-family: "Courier New", Courier, monospace;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  background: #607d8b;
  color: #eceff1;
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
  color: #eceff1;
  text-decoration: none;
  font-weight: bold;
}

header nav a:hover {
  text-decoration: underline;
}
</style>
