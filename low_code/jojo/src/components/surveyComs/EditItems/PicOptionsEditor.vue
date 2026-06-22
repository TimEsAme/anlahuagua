<template>
  <div>
    <div class="flex align-item-center mt-30">
      <div class="mr-10">题目选项</div>
      <el-button
        size="small"
        :icon="Plus"
        circle
        @click="addOptionHandle"
      ></el-button>
    </div>
    <div
      v-for="(item, index) in textArr"
      :key="index"
    >
      <!-- 选项 -->
      <div class="title mt-10 mb-10 flex align-item-center">
        <span class="mr-10">选项{{ index + 1 }}</span>
        <el-button
          type="danger"
          size="small"
          :icon="Minus"
          circle
          @click="romoveOptionHandle(index)"
        ></el-button>
      </div>
      <!-- 图片 -->
      <div class="mb-5">
        <div
          v-if="item.value"
          class="flex"
        >
          <span class="title mr-5">已上传图片</span>
          <el-link
            type="primary"
            @click="deletePic(index)"
            >删除图片</el-link
          >
        </div>
        <span
          class="title"
          v-else
          >未上传图片</span
        >
      </div>
      <!-- 标题 -->
      <el-input
        class="mb-5"
        v-model="item.picTitle"
        placeholder="图片标题"
      ></el-input>
      <!-- 描述 -->
      <el-input
        type="textarea"
        :rows="3"
        class="mb-5"
        placeholder="图片描述"
        v-model="item.picDesc"
      ></el-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComType, PicTitleDescStatusArr, UpdateStatus } from '@/types';
import { Minus, Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { inject, ref } from 'vue';
const props = defineProps<{
  configKey: string;
  id: string;
  currentStatus: number;
  isShow: boolean;
  name: string;
  editCom: ComType;
  status: PicTitleDescStatusArr;
}>();
const textArr = ref(props.status);

const updateStatus = inject<UpdateStatus>('updateStatus');

const addOptionHandle = () => {
  if (updateStatus) {
    updateStatus(props.configKey);
  }
};

const romoveOptionHandle = (index: number) => {
  if (updateStatus) {
    updateStatus(props.configKey, index);
  }
};
const deletePic = (index: number) => {
  ElMessageBox.confirm('确认删除吗?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      if (updateStatus) {
        updateStatus(props.configKey, { link: '', index });
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
};
</script>

<style scoped lang="scss">
.title {
  color: var(--font-color-light);
  font-size: var(--font-size-base);
}
.delete {
  transform: scale(0.8);
}
</style>
