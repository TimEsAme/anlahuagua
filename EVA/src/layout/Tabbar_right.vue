<template>
  <div class="tabbar_right">
    <el-button
      class="tabbar_right_button"
      icon="Refresh"
      size="large"
      circle
      @click="refreshEvent"
    ></el-button>
    <el-button
      class="tabbar_right_button"
      icon="FullScreen"
      size="large"
      circle
      @click="fullScreen"
    ></el-button>
    <el-button
      class="tabbar_right_button"
      icon="setting"
      size="large"
      circle
    ></el-button>
    <!-- <img src="../../public/avatar.png" alt="" class="avatar" /> -->
    <img :src="userStore.avatar" alt="" class="avatar" />
    <el-dropdown>
      <span class="el-dropdown-link">
        <!-- admin -->
        {{ userStore.username }}
        <el-icon>
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import useSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRoute, useRouter } from "vue-router";
defineOptions({
  name: "TabbarRight",
});
const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();
const userStore = useUserStore();

const refreshEvent = () => {
  // settingStore.refresh = !settingStore.refresh;
  settingStore.changeRefresh();
};

const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const logOut = async () => {
  await userStore.userLogOut(userStore.token);
  router.push({ path: "/login", query: { redirect: route.path } });
};
</script>

<style scoped lang="scss">
.tabbar_right {
  display: flex;
  align-items: center;
  margin-right: 20px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 10px;
  }
  .el-dropdown {
    font-size: 20px;
  }
  .el-icon {
    vertical-align: -10%;
  }
  .el-dropdown-link {
    white-space: nowrap;
  }
}
</style>
