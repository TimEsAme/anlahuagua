<template>
  <div class="layout">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: settingStore.fold ? true : false }"
    >
      <Logo :fold="settingStore.fold" />
      <el-scrollbar class="elScrollBar">
        <el-menu
          class="elMenu"
          router
          background-color="tomato"
          text-color="white"
          active-text-color="black"
          :default-active="route.path"
          :collapse="settingStore.fold"
        >
          <Menu :menuList="userStore.routesMenu"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layouit_tabbar">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容区 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from "./Logo.vue";
import Main from "./Main.vue";
import Menu from "./Menu.vue";
import Tabbar from "./Tabbar.vue";
import useUserStore from "@/store/modules/user";
import useSettingStore from "@/store/modules/setting";

import { useRoute } from "vue-router";

defineOptions({
  name: "Layout",
});

const route = useRoute();
const userStore = useUserStore();
const settingStore = useSettingStore();
</script>

<style scoped lang="scss">
.layout {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;

  .layout_slider {
    width: 300px;
    transition: width 0.3s;
    grid-row: span 2;
    grid-column: 1;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: tomato;

    .elScrollBar {
      height: calc(100vh - 100px);
    }

    .elMenu {
      border: none;
    }

    &.fold {
      width: 100px;
    }
  }
  .layouit_tabbar {
    height: 80px;
  }

  .layout_main {
    background-color: brown;
    overflow: auto;
    padding: 20px;
  }
}
</style>
