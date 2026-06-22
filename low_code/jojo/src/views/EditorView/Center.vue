<template>
  <div
    ref="centerContainer"
    class="center-container"
  >
    <draggable
      v-model="store.coms"
      itemKey="index"
      @start="dragStart"
    >
      <template #item="{ element, index }">
        <div
          class="content mb-10 relative"
          :class="{
            active: store.currentComponentIndex === index,
          }"
          @click="ckickHandle(index)"
          :key="element.id"
          :ref="(el) => (componentsRefs[index] = el)"
        >
          <component
            :is="element.type"
            :status="element.status"
            :serialNum="serialNum[index]"
          ></component>
          <!-- 删除按钮 -->
          <div class="absolute delete-btn">
            <el-button
              v-show="store.currentComponentIndex === index"
              class="ml-10"
              type="danger"
              circle
              size="small"
              :icon="Close"
              @click.stop="removeCom(index)"
            ></el-button>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/stores/useEditor';
import emitter from '@/utils/eventBus';
import { useSurveyNum } from '@/utils/hooks';
import { Close } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, nextTick, ref, type ComponentPublicInstance } from 'vue';
import draggable from 'vuedraggable';
const store = useEditorStore();

const centerContainer = ref<HTMLElement | null>(null);
const scrollToBottom = function () {
  nextTick(() => {
    const container = centerContainer.value;
    if (container) {
      window.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  });
};
const componentsRefs = ref<(Element | ComponentPublicInstance | null)[]>([]);
const scrollToCenter = function (index: number) {
  nextTick(() => {
    const element = componentsRefs.value[index];
    if (element instanceof HTMLElement) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  });
};
emitter.on('scrollToBottom', scrollToBottom);
emitter.on('scrollToCenter', scrollToCenter);

const ckickHandle = (index: number) => {
  if (store.currentComponentIndex === index) {
    store.currentComponentIndex = -1;
  } else {
    store.setCurrentComponentIndex(index);
  }
};

const dragStart = () => {
  store.currentComponentIndex = -1;
};
const removeCom = (index: number) => {
  ElMessageBox.confirm('确认删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store.removeCom(index);
      store.currentComponentIndex = -1;
    })
    .catch(() => {
      ElMessage.info('取消删除');
    });
};

// 获取题目编号
const serialNum = computed(() => useSurveyNum(store.coms).value);
</script>

<style scoped lang="scss">
.center-container {
  width: 50%;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  margin: 70px auto;
  padding: 20px;
  background: var(--white);
  position: relative;
  .content {
    cursor: pointer;
    padding: 10px;
    background-color: var(--white);
    border-radius: var(--border-radius-sm);
    &:hover {
      transform: scale(1.01);
      transition: 0.5s;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
}
.active {
  transform: scale(1.01);
  transition: 0.5s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.delete-btn {
  right: -5px;
  top: -10px;
}
</style>
