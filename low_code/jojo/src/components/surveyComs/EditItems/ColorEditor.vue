<template>
  <div class="mt-30 flex space-between">
    <div class="flex align-items-center">
      <div class="mr-20">
        {{ configKey === 'titleColor' ? '标题颜色' : '描述颜色   ' }}
      </div>
      <div class="currentStatus">{{ status }}</div>
    </div>
    <div>
      <el-color-picker
        v-model="currentColor"
        @change="changeColor"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComType, UpdateStatus } from '@/types';
import ButtonGroup from './ButtonGroup.vue';
import { inject, ref } from 'vue';
const props = defineProps<{
  configKey: string;
  id: string;
  isShow: boolean;
  name: string;
  editCom: ComType;
  status: string;
}>();

const currentColor = ref(props.status);
const changeColor = (color: string) => {
  if (updateStatus) {
    updateStatus(props.configKey, color);
  }
};

const updateStatus = inject<UpdateStatus>('updateStatus');
</script>

<style scoped lang="scss">
.currentStatus {
  color: var(--info-color);
  font-size: var(--font-size-base);
}
</style>
