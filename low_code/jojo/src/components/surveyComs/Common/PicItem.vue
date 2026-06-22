<template>
  <div
    class="container mb-10"
    @click.stop
  >
    <div class="top flex justify-content-center align-items-center">
      <el-upload
        class="avatar-uploader"
        action="/api/upload"
        name="image"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        />
        <div
          v-else
          class="flex align-items-center"
        >
          <el-icon>
            <Upload />
          </el-icon>
          <span>添加图片</span>
        </div>
      </el-upload>
    </div>
    <!-- 图片标题和描述 -->
    <div
      class="bottom flex justify-content-center align-items-center flex-direction-column font-weight-500"
    >
      <div class="item">{{ picTitle }}</div>
      <div class="desc mt-5 mb-5">{{ picDesc }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue';
import { Upload } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
import type { GetLink } from '@/types';

const props = defineProps({
  picTitle: {
    type: String,
    default: '',
  },
  picDesc: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  index: {
    type: Number,
    default: 0,
  },
});
const imageUrl = ref('');

const getLink = inject<GetLink>('getLink', () => {});

watch(
  () => props.value,
  async (newVal) => {
    if (newVal) {
      const res = await fetch(newVal);
      const blob = await res.blob();
      const file = new File([blob], 'image.jpg', { type: blob.type });
      imageUrl.value = URL.createObjectURL(file);
    } else {
      imageUrl.value = '';
    }
  },
  { immediate: true },
);

// 上传之前的回调
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不要超过2MB!');
    return false;
  }
  return true;
};
// 成功之后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  if (getLink) {
    getLink({
      index: props.index,
      link: response.imageUrl,
    });
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 200px;
  height: 300px;
  border: 1px solid var(--font-color-lightest);
  border-radius: var(--border-radius-md);
  color: var(--font-color-light);
  > .top {
    width: 100%;
    height: 200px;
    background-color: var(--font-color-lightest);
  }
  > .bottom {
    height: 100px;
    font-size: var(--font-size-lg);
    > .item {
      color: var(--font-color-light);
    }
    > .desc {
      font-size: var(--font-size-base);
      color: var(--font-color-light);
    }
  }
}
.avatar {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
