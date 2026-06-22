<template>
  <div key="id">
    <div class="flex space-between mb-10 mt-30">
      <div class="flex align-items-center">
        <div class="mr-20">日期类型</div>
        <div class="currentStatus">
          {{ status[currentStatus]?.status }}
        </div>
      </div>
      <div>
        <el-select
          style="width: 100px"
          placeholder="日期类型"
          v-model="selectValue"
          @change="selectValueChangeHandle"
        >
          <el-option
            v-for="(item, index) in status"
            :key="item.value"
            :label="item.status"
            :value="index"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComType, UpdateStatus, valueStatusArr } from '@/types';
import { inject, ref } from 'vue';

const props = defineProps<{
  configKey: string;
  id: string;
  name: string;
  currentStatus: number;
  status: valueStatusArr;
  isShow: boolean;
  editCom: ComType;
}>();

const selectValue = ref('');

const updateStatus = inject<UpdateStatus>('updateStatus');

const selectValueChangeHandle = (val: string) => {
  if (updateStatus) {
    updateStatus(props.configKey, val, props.name);
  }
};
</script>

<style scoped lang="scss">
.currentStatus {
  color: var(--info-color);
  font-size: var(--font-size-base);
}
</style>
