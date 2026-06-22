<template>
  <div class="tabbar_left">
    <el-icon :size="30" class="el_icon" @click="settingStore.changeIcon">
      <component :is="settingStore.fold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight" class="breadcrumb">
      <template v-for="e in route.matched" :key="e.path">
        <el-breadcrumb-item v-if="e.path != '/'">
          <el-icon class="breadcrumb_icon">
            <component :is="e.meta.icon"></component>
          </el-icon>
          <span>{{ e.meta.title }}</span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import useSettingStore from "@/store/modules/setting";
import { useRoute } from "vue-router";
defineOptions({
  name: "TabbarLeft",
});

const settingStore = useSettingStore();
const route = useRoute();
</script>

<style scoped lang="scss">
.tabbar_left {
  display: flex;
  align-items: center;
  margin-left: 20px;
  .breadcrumb {
    max-width: 100%;
    margin-left: 15px;
    font-size: 20px;
    white-space: nowrap;
  }

  .breadcrumb_icon {
    margin-right: 5px;
    vertical-align: -10%;
  }
}
.breadcrumb {
  display: flex;
  align-items: center;
}
</style>
