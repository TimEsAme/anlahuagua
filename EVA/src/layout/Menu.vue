<template>
  <template v-for="e in menuList" :key="e.path">
    <!-- 没有子路由 -->
    <el-menu-item v-if="!e.children && e.meta.show" :index="e.path">
      <el-icon>
        <component :is="e.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ e.meta.title }}</span>
      </template>
    </el-menu-item>

    <!-- 只有一个子路由 -->
    <el-menu-item
      v-if="e.children && e.children.length == 1 && e.meta.show"
      :index="e.children[0].path"
    >
      <el-icon>
        <component :is="e.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ e.children[0].meta.title }}</span>
      </template>
    </el-menu-item>

    <!-- 多个子路由 -->
    <el-sub-menu
      :index="e.path"
      v-if="e.children && e.children.length > 1 && e.meta.show"
    >
      <template #title>
        <el-icon>
          <component :is="e.meta.icon"></component>
        </el-icon>
        <span>{{ e.meta.title }}</span>
      </template>
      <Menu :menuList="e.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Menu",
});
defineProps(["menuList"]);
</script>

<style scoped></style>
