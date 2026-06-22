<template>
  <div key="id">
    <div class="mb-10 mt-30">描述内容</div>
    <el-input
      type="textarea"
      placeholder="请输入题目标题"
      :rows="5"
      v-model="desc"
      @update:model-value="inputHandle"
    ></el-input>
  </div>
</template>

<script lang="ts" setup>
import type { ComType, UpdateStatus } from '@/types';
import { inject, ref } from 'vue';
const props = defineProps<{
  configKey: string;
  id: string;
  name: string;
  isShow: boolean;
  status: string;
  editCom: ComType;
}>();

const desc = ref(props.status);
const updateStatus = inject<UpdateStatus>('updateStatus');

const inputHandle = (newVal: string) => {
  if (updateStatus) {
    updateStatus(props.configKey, newVal);
  }
};
</script>

<style scoped lang="scss"></style>
