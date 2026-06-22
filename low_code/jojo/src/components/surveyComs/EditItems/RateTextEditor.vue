<template>
  <div key="id">
    <div class="flex mb-10 mt-30">
      <div class="flex align-items-center">
        <span class="mr-10">辅助文字</span>
        <el-switch
          :model-value="isUse"
          @change="switchChangeHandle"
        />
      </div>
    </div>

    <div v-if="isUse">
      <el-input
        class="mr-5 mb-5"
        v-for="(_item, i) in props.status"
        :key="i"
        placeholder="辅助文字"
        v-model="textArr[i]"
        @input="(val: string) => inputHandle(val, i)"
      ></el-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComType } from '@/types';
import { inject, ref } from 'vue';

const props = defineProps<{
  configKey: string;
  id: string;
  name: string;
  currentStatus: number;
  status: string[];
  isShow: boolean;
  isUse: boolean;
  editCom: ComType;
}>();

const textArr = ref(props.status);

const updateStatus = inject('updateStatus') as (
  configKey: string,
  payload?: string | number | boolean | object,
) => void;

const switchChangeHandle = (val: boolean) => {
  updateStatus(props.configKey, val);
};

function inputHandle(val: string, index: number) {
  if (updateStatus) {
    updateStatus(props.configKey, { val, index });
  }
}
</script>

<style scoped lang="scss"></style>
