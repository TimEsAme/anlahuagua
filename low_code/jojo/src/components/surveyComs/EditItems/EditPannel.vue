<template>
  <div class="editPannelContainer">
    <div
      v-for="(item, key) in com.status"
      :key="item.id"
    >
      <component
        v-if="item.isShow"
        :is="item.editCom"
        :config-key="key"
        v-bind="item"
      ></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Status } from '@/types';
const props = defineProps<{
  com: Status;
}>();
</script>

<style scoped lang="scss">
.editPannelContainer {
  padding: 25px;
  background-color: var(--bg-color);
}
</style>
