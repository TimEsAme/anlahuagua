<template>
  <div>
    <div
      class="survey-com-item-container pointer flex justify-content-center align-items-center self-center pl-10 pr-10 mb-10"
      @click="addSurveyComItem"
    >
      <div>{{ item?.comName }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap';
import type { Material, Status } from '@/types';
import { updateInitStatusBeforeAdd } from '@/utils';
import { useEditorStore } from '@/stores/useEditor';
import emitter from '@/utils/eventBus';

// const props = defineProps({
//   item: Object as PropType<MaterialItem>,
// });

const store = useEditorStore();
const props = defineProps(['item']);

const addSurveyComItem = () => {
  const newSurveyComName = props.item.materialName as Material;

  if (!newSurveyComName) {
    console.warn('请先选择题型');
    return;
  }
  const newSurveyComStatus = defaultStatusMap[newSurveyComName]() as Status;
  updateInitStatusBeforeAdd(newSurveyComStatus, newSurveyComName);
  store.addCom(newSurveyComStatus);
  emitter.emit('scrollToBottom');
};
</script>

<style scoped lang="scss">
.survey-com-item-container {
  width: 60px;
  height: 30px;
  background-color: var(--background-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  color: var(--font-color-light);
  user-select: none;
}
.survey-com-item-container:hover {
  background-color: var(--font-color-lightest);
}
</style>
