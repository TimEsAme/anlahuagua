<template>
  <div class="flex align-items-center space-between">
    <!-- 标题和状态 -->
    <div class="flex align-items-center">
      <div class="mr-20">{{ title }}</div>
      <div class="currentStatus">{{ status }}</div>
    </div>
    <!-- 按钮组 -->
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.currentStatus {
  color: var(--info-color);
  font-size: var(--font-size-base);
}
</style>
