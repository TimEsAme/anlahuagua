<template>
  <div id="app" class="container">
    <el-header>
      <el-row>
        <el-col :span="6">
          <div class="logo"></div>
        </el-col>
        <el-col :span="18">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            :default-active="activeIndex"
          >
            <el-menu-item index="index">
              <NuxtLink to="/" class="navigation">主页</NuxtLink>
            </el-menu-item>
            <el-menu-item index="about">
              <NuxtLink to="/about" class="navigation">关于我们</NuxtLink>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>

    <div class="content">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
// 初始化 activeIndex 为当前路由的名称
const activeIndex = ref(route.matched[0]?.name || "index");

const handleSelect = (index) => {
  activeIndex.value = index;
};

watch(route, () => {
  activeIndex.value = route.matched[0].name || "index";
});
</script>

<style scoped>
.container {
  width: 1200px;
  padding-top: 20px;
  margin: 0 auto;
}
.navbar-brand {
  font-size: 18px;
  line-height: 60px;
  padding-left: 20px;
}
.navigation {
  text-decoration: none;
  color: inherit;
}
.logo {
  width: 100%;
  height: 60px;
  background: url("./assets/imgs/logo.jpg") no-repeat center;
  background-size: 90%;
}
.text-right {
  text-align: right;
  display: flex;
  align-items: center;
}
</style>
