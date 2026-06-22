<template>
  <div
    ref="preview-container"
    class="preview-container pb-40"
  >
    <div class="center mc">
      <div class="button-group flex space-between align-items-center">
        <div class="flex space-between no-print">
          <el-button
            type="danger"
            @click="gobackHandle"
            >返回</el-button
          >
          <el-button
            type="success"
            @click="genQuiz"
            >生成在线问卷</el-button
          >
          <el-button
            type="warning"
            @click="genPDF"
            >生成本地PDF</el-button
          >
        </div>
        <div class="mr-15">
          <el-text class="mx-1">题目数量：{{ store.surveyCount }}</el-text>
        </div>
      </div>
      <div class="content-group no-border">
        <div
          class="content mb-10"
          v-for="(com, index) in store.coms"
          :key="index"
        >
          <component
            :is="com.type"
            :status="com.status"
            :serialNum="serialNum[index]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSurveyById } from '@/db/operation';
import { useEditorStore } from '@/stores/useEditor';
import { isPdfCom } from '@/types';
import { restoreComponentsStatus } from '@/utils';
import { useSurveyNum } from '@/utils/hooks';
import { ElMessage } from 'element-plus';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const store = useEditorStore();
const route = useRoute();
const router = useRouter();

const id = Number(route.params.id);
if (id) {
  getSurveyById(id).then((res) => {
    if (res) {
      restoreComponentsStatus(res.coms);
      store.setStore(res);
    }
  });
}

// 获取题目编号
const serialNum = computed(() => useSurveyNum(store.coms).value);
// 返回
const gobackHandle = () => {
  const path = history.state.from;
  if (path === 'home') {
    router.back();
  } else {
    router.push(`/editor/${id}/survey-type`);
  }
};
const genPDF = () => {
  const res = store.coms.every((com) => isPdfCom(com.name));
  if (!res) {
    ElMessage.warning('当前问卷中存在不支持生成PDF的组件,请删除后重试');
  }
  // 生成pdf
  window.print();
};

const genQuiz = () => {};
</script>

<style scoped lang="scss">
.preview-container {
  width: 100vw;
  min-height: 100vh;
  background: url('@/assets/imgs/editor_background.png');
}
.center {
  width: 800px;
}
.button-group {
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  background-color: var(--white);
  z-index: 100;
}
.content-group {
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background: var(--white);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
@media print {
  .no-print {
    display: none;
  }
  .no-border {
    border: none;
    box-shadow: none;
  }
}
</style>
