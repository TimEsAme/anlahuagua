<template>
  <div class="mt-30">
    <ButtonGroup
      :title="`${configKey === 'titleSize' ? '标题' : '描述'}加粗`"
      :status="status[currentStatus]"
    >
      <el-button-group>
        <el-button
          :class="{
            select: currentStatus === 0,
          }"
          @click="changePosition(0)"
        >
          <font-awesome-icon
            icon="fa-text-width"
            size="lg"
          />
        </el-button>
        <el-button
          :class="{
            select: currentStatus === 1,
          }"
          @click="changePosition(1)"
        >
          <font-awesome-icon
            icon="fa-text-width"
            size="xs"
          />
        </el-button>
      </el-button-group>
    </ButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import type { ComType } from '@/types';
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

const updateStatus = inject('updateStatus') as (
  configKey: string,
  payload?: string | number | boolean | object,
) => void;

const changePosition = (position: number) => {
  updateStatus(props.configKey, position);
};
</script>

<style scoped lang="scss"></style>
