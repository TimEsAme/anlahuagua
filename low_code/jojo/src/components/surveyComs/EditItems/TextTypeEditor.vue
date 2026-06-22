<template>
  <div class="mt-30 mb-20">
    <ButtonGroup
      title="说明类型"
      :status="status[currentStatus]"
    >
      <el-button-group>
        <el-button
          :class="{
            select: currentStatus === 0,
          }"
          @click="changeType(0)"
        >
          <font-awesome-icon
            icon="heading"
            size="lg"
          />
        </el-button>
        <el-button
          :class="{
            select: currentStatus === 1,
          }"
          @click="changeType(1)"
        >
          <font-awesome-icon
            icon="paragraph"
            size="lg"
          />
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

const changeType = (type: number) => {
  if (updateStatus) {
    updateStatus(props.configKey, type, props.name);
  }
};
</script>

<style scoped lang="scss"></style>
