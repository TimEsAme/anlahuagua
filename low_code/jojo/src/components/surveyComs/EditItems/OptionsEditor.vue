<template>
  <div key="id">
    <div class="flex mb-10 mt-30">
      <div class="mr-10">选项</div>
      <el-button
        size="small"
        :icon="Plus"
        circle
        @click="addOptionHandle"
      ></el-button>
    </div>

    <div
      class="flex"
      v-for="(item, i) in props.status"
      :key="i"
    >
      <el-input
        placeholder="选项"
        class="mr-5 mb-5"
        v-model="textArr[i]"
      ></el-input>
      <el-button
        type="danger"
        :icon="Close"
        circle
        @click="removeOption(i)"
      ></el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComType } from '@/types';
import { Plus, Close } from '@element-plus/icons-vue';
import { inject, ref } from 'vue';

const props = defineProps<{
  configKey: string;
  id: string;
  currentStatus: number;
  isShow: boolean;
  name: string;
  editCom: ComType;
  status: string[];
}>();

const textArr = ref(props.status);
const updateStatus = inject('updateStatus') as (
  configKey: string,
  payload?: string | number | boolean | object,
) => void;

const addOptionHandle = () => {
  updateStatus(props.configKey);
};
const removeOption = (i: number) => {
  updateStatus(props.configKey, i);
};
</script>

<style scoped lang="scss"></style>
