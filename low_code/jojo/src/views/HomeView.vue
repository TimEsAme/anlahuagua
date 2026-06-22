<template>
  <div class="pt-20 pb-20 pl-20 pr-20">
    <h1 class="font-weight-100 text-center">安拉花瓜问卷系统!!!</h1>
    <!-- 按钮 -->
    <div class="mb-15">
      <el-button
        type="primary"
        :icon="Plus"
        @click="goEditor"
      >
        创建问卷
      </el-button>
      <el-button
        type="success"
        :icon="Compass"
        @click="goMaterials"
        >组件市场
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableDate"
      style="width: 100%"
      border
    >
      <el-table-column
        fixed
        prop="createDate"
        label="创建日期"
        width="250"
        :formatter="formatDate"
      />
      <el-table-column
        prop="title"
        label="问卷标题"
      />
      <el-table-column
        prop="surveyCount"
        label="题目数"
        width="150"
        align="center"
      />
      <el-table-column
        prop="updateDate"
        label="最近更新日期"
        width="250"
        align="center"
        :formatter="formatDate"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="300"
        align="center"
      >
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click="viewSurvey(row)"
            >查看问卷
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="editSurvey(row)"
            >编辑
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="deleteSurvey(row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { getAllSurvey } from '@/db/operation';
import { useEditorStore } from '@/stores/useEditor';
import type { SurveyDBData, SurveyDBReturnData } from '@/types';
import { formatDate } from '@/utils';
import { Plus, Compass } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useEditorStore();

const tableDate = ref<SurveyDBData[]>([]);
const getData = () => {
  getAllSurvey().then((res) => {
    tableDate.value = res;
  });
};
getData();

const goEditor = () => {
  localStorage.setItem('activeView', 'editor');
  router.push({
    name: 'editor',
  });
};
const goMaterials = () => {
  localStorage.setItem('activeView', 'materials');
  router.push({
    name: 'materials',
  });
};

const viewSurvey = (surveyInfo: SurveyDBReturnData) => {
  router.push({
    path: `/preview/${surveyInfo.id}`,
    state: {
      from: 'home',
    },
  });
};

const editSurvey = (surveyInfo: SurveyDBReturnData) => {
  router.push({
    path: `/editor/${surveyInfo.id}/survey-type`,
    state: {
      from: 'home',
    },
  });
};
const deleteSurvey = (surveyInfo: SurveyDBReturnData) => {
  ElMessageBox.confirm('确定删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await store.removeComs(surveyInfo.id);
      getData();
      ElMessage.success('删除成功');
    })
    .catch(() => {
      ElMessage.info('取消删除');
    });
};
</script>

<style scoped></style>
