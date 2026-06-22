<template>
  <div
    :class="{
      'text-center': computedState.position,
    }"
  >
    <MaterialsHeader
      :serialNum="serialNum"
      :title="computedState.title"
      :desc="computedState.desc"
      :titleSize="computedState.titleSize"
      :descSize="computedState.descSize"
      :titleWeight="computedState.titleWeight"
      :descWeight="computedState.descWeight"
      :titleItalic="computedState.titleItalic"
      :descItalic="computedState.descItalic"
      :titleColor="computedState.titleColor"
      :descColor="computedState.descColor"
    />
    <div>
      <el-input
        v-model="inputValue"
        v-if="computedState.type === 0"
      />
      <el-input
        v-else
        type="textarea"
        :rows="5"
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import MaterialsHeader from '../../Common/MaterialsHeader.vue';
import type { TypeStatus } from '@/types';
import { getCurrentStatus, getStringStatusByCurrent, getTextStatus } from '@/utils';

const props = defineProps<{
  serialNum: number;
  status: TypeStatus;
}>();

const inputValue = ref('');

const computedState = computed(() => ({
  type: getCurrentStatus(props.status.type),
  title: getTextStatus(props.status.title),
  desc: getTextStatus(props.status.desc),
  position: getCurrentStatus(props.status.position),
  titleSize: getStringStatusByCurrent(props.status.titleSize),
  descSize: getStringStatusByCurrent(props.status.descSize),
  titleWeight: getCurrentStatus(props.status.titleWeight),
  descWeight: getCurrentStatus(props.status.descWeight),
  titleItalic: getCurrentStatus(props.status.titleItalic),
  descItalic: getCurrentStatus(props.status.descItalic),
  titleColor: getTextStatus(props.status.titleColor),
  descColor: getTextStatus(props.status.descColor),
}));
</script>

<style scoped lang="scss">
.radio-group {
  height: 40px;
}
</style>
