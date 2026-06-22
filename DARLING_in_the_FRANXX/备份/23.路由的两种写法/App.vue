<template>
  <div class="app">
    <Header />
    <div class="navigate">
      <router-link
        :to="{
          path: '/home',
        }"
        active-class="active"
        >首页
      </router-link>
      <router-link
        :to="{
          name: 'news',
        }"
        active-class="active"
        >新闻</router-link
      >
      <router-link to="/about" active-class="active">关于</router-link>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "./components/Header.vue";

defineOptions({
  name: "App",
});
</script>

<style scoped>
.navigate {
  display: flex;
  justify-content: space-around;
  margin: 0 100px;
}

.navigate a {
  display: block;
  text-align: center;
  width: 90px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: gray;
  text-decoration: none;
  color: white;
  font-size: 18px;
  letter-spacing: 5px;
}

.navigate a.active {
  background-color: #64967e;
  color: #ffc268;
  font-weight: 900;
  text-shadow: 0 0 1px black;
  font-family: 微软雅黑;
}

.main-content {
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 10px;
  width: 90%;
  height: 400px;
  border: 1px solid;
}
</style>
