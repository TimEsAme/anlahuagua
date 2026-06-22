<template>
  <div v-if="store.surveyCount">
    <draggable
      v-model="store.coms"
      itemKey="index"
      @start="dragStart"
    >
      <template #item="{ element, index }">
        <div
          class="mb-10"
          :class="{
            active: store.currentComponentIndex === index,
          }"
          v-show="isSurveyComName(element.name)"
          @click="clickHandle(index)"
        >
          <div class="item">
            {{ serialNum[index] }}
            {{
              element.status.title.status.length > 10
                ? element.status.title.status.substring(0, 10) + '...'
                : element.status.title.status
            }}
          </div>
        </div>
      </template>
    </draggable>
  </div>
  <div
    v-else
    class="tip flex align-items-center justify-content-center"
  >
    请添加题目
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/stores/useEditor';
import { isSurveyComName } from '@/types';
import emitter from '@/utils/eventBus';
import { useSurveyNum } from '@/utils/hooks';
import { computed } from 'vue';
import draggable from 'vuedraggable';

// 获取题目编号
const serialNum = computed(() => useSurveyNum(store.coms).value);

const store = useEditorStore();

const dragStart = () => {
  store.currentComponentIndex = -1;
};

const clickHandle = (index: number) => {
  if (store.currentComponentIndex === index) {
    store.currentComponentIndex = -1;
  } else {
    store.setCurrentComponentIndex(index);
    emitter.emit('scrollToCenter', index);
  }
};
</script>

<style scoped lang="scss">
.item {
  /* outline: 1px solid black; */
  color: var(--font-color-light);
  font-size: var(--font-size-base);
  padding: 10px;
  cursor: pointer;
}
.tip {
  height: calc(100% - 50px);
}
.active {
  transform: scale(1.04);
  transition: 0.5s;
  background-color: var(--border-color);
  border-radius: var(--border-radius-lg);
}
</style>
