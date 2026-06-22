<template>
  <div class="mt-30">
    <ButtonGroup
      title="居中设置"
      :status="status[currentStatus]"
    >
      <el-button-group>
        <el-button
          :class="{
            select: currentStatus === 0,
          }"
          @click="changePosition(0)"
        >
          <font-awesome-icon icon="align-left" />
        </el-button>
        <el-button
          :class="{
            select: currentStatus === 1,
          }"
          @click="changePosition(1)"
        >
          <font-awesome-icon icon="align-center" />
        </el-button>
      </el-button-group>
    </ButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import type { ComType, UpdateStatus } from '@/types';
import ButtonGroup from './ButtonGroup.vue';
import { inject } from 'vue';

const props = defineProps<{
  configKey: string;
  id: string;
  currentStatus: number;
  isShow: boolean;
  name: string;
  editCom: ComType;
  status: string[];
}>();

const updateStatus = inject<UpdateStatus>('updateStatus');

const changePosition = (position: number) => {
  if (updateStatus) {
    updateStatus(props.configKey, position);
  }
};
</script>
<style scoped></style>
