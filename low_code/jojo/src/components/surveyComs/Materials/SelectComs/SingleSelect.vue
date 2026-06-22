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
    <div class="radio-group">
      <el-radio-group
        v-model="optionsCurrentStatus"
        @change="optionsCurrentStatusHandle"
      >
        <el-radio
          v-for="(e, i) in computedState.options"
          :key="i"
          :value="e"
          >{{ e }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import MaterialsHeader from '../../Common/MaterialsHeader.vue';
import type { OptionsStatus } from '@/types';
import {
  getCurrentStatus,
  getStringStatus,
  getStringStatusByCurrent,
  getTextStatus,
} from '@/utils';

const props = defineProps<{
  serialNum: number;
  status: OptionsStatus;
}>();

const optionsCurrentStatus = ref('');
const optionsCurrentStatusHandle = (val: number) => {};

const computedState = computed(() => ({
  title: getTextStatus(props.status.title),
  desc: getTextStatus(props.status.desc),
  options: getStringStatus(props.status.options),
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
