<template>
  <div key="id">
    <div class="mb-10">标题内容</div>
    <el-input
      placeholder="请输入题目标题"
      v-model="text"
      @update:model-value="inputHandle"
    ></el-input>
  </div>
</template>

<script lang="ts" setup>
import type { ComType } from '@/types';
import { inject, ref } from 'vue'; 
const props = defineProps<{
  configKey: string;
  id: string;
  name: string;
  isShow: boolean;
  status: string;
  editCom: ComType;
}>();

const text = ref(props.status);

const updateStatus = inject('updateStatus') as (
  configKey: string,
  payload?: string | number | boolean | object,
) => void;

function inputHandle(newVal: string) {
  updateStatus(props.configKey, newVal);
}
</script>

<style scoped lang="scss"></style>
