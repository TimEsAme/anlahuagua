<template>
  <h1
    v-if="computedState.type === 0"
    class="pt-10 pb-10 text-center font-weight-200"
    :class="{
      'font-bold': !computedState.titleWeight,
      'font-italic': !computedState.titleWeight,
    }"
    :style="{
      fontSize: computedState.titleSize + 'px',
      color: computedState.titleColor,
    }"
  >
    {{ computedState.title }}
  </h1>
  <p
    v-else
    :class="{
      'text-center': computedState.position,
      'font-bold': !computedState.descWeight,
      'font-italic': !computedState.descItalic,
    }"
    :style="{
      fontSize: computedState.descSize + 'px',
      color: computedState.descColor,
    }"
  >
    {{ computedState.desc }}
  </p>
</template>

<script lang="ts" setup>
import type { TypeStatus } from '@/types';
import { getCurrentStatus, getStringStatusByCurrent, getTextStatus } from '@/utils';
import { computed } from 'vue';
const props = defineProps<{
  status: TypeStatus;
}>();

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

<style scoped lang="scss"></style>
