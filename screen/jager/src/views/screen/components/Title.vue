<template>
  <h3 class="screen-title">
    <slot>
      {{ title }}
    </slot>
  </h3>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
  },
});
</script>

<style scoped lang="scss">
.screen-title {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background-color: var(--ds-screen-text-color);
  }
  // 调整这个值来控制间距
  padding-left: 12px;
}
</style>
