<template>
  <div>
    <div class="container flex self-start align-items-center border-box">
      <!-- 分为三个部分 -->
      <div class="left flex justify-content-center align-items-center">
        <el-button
          :icon="ArrowLeft"
          circle
          size="small"
          @click="goHome"
        />
      </div>
      <div class="center flex align-items-center space-between pl-15 pr-15">
        <div v-if="isEdit">
          <div v-if="id">
            <el-button
              type="warning"
              size="small"
              @click="updateSurvey()"
              >更新问卷
            </el-button>
          </div>
          <div v-else>
            <el-button
              type="danger"
              size="small"
              @click="reset"
              >重置问卷
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="save"
              >保存问卷
            </el-button>
          </div>
        </div>
        <div v-if="isEdit">
          <el-button
            type="primary"
            size="small"
            @click="preview"
            >预览
          </el-button>
        </div>
      </div>
      <div class="right flex justify-content-center align-items-center">
        <el-avatar
          :size="30"
          :src="avatar"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/stores/useEditor';
import { ArrowLeft } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useEditorStore();
const props = defineProps({
  isEdit: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    default: '',
  },
});

const avatar = ref('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif');

const goHome = () => {
  localStorage.setItem('activeView', 'home');
  router.push('/');
};

const reset = () => {
  ElMessageBox.confirm('确定重置吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store.resetComs();
      ElMessage.success('重置成功');
    })
    .catch(() => {
      ElMessage.info('取消重置');
    });
};

const savePromise = () => {
  return new Promise((resolve, reject) => {
    ElMessageBox.prompt('请输入题目?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info',
    })
      .then(({ value }) => {
        const surveyToSave = {
          createDate: new Date().getTime(),
          updateDate: new Date().getTime(),
          title: value,
          surveyCount: store.surveyCount,
          coms: JSON.parse(JSON.stringify(store.coms)),
        };
        store
          .saveComs(surveyToSave)
          .then((id) => {
            // router.push(`/editor/${id}/survey-type`);
            resolve(id);
            ElMessage.success('保存成功');
          })
          .catch((e) => {
            reject(e);
            ElMessage.info('保存失败');
          });
      })
      .catch(() => {
        ElMessage.info('取消保存');
      });
  });
};
const save = () => {
  savePromise().then((id) => {
    router.push(`/editor/${id}/survey-type`);
  });
};

const updateSurvey = () => {
  return store
    .updateComs(Number(props.id), {
      updateDate: new Date().getTime(),
      surveyCount: store.surveyCount,
      coms: JSON.parse(JSON.stringify(store.coms)),
    })
    .then(() => {
      ElMessage.success('更新成功');
    })
    .catch(() => {
      ElMessage.error('更新失败');
    });
};

const preview = () => {
  ElMessageBox.confirm('预览会自动保存问卷,是否继续', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
  })
    .then(async () => {
      if (props.id) {
        updateSurvey();
        router.push({
          path: `/preview/${props.id}`,
          state: {
            from: 'editor',
          },
        });
      } else {
        savePromise().then((id) => {
          router.push({
            path: `/preview/${id}`,
            state: {
              from: 'editor',
            },
          });
        });
      }
    })
    .catch(() => {
      ElMessage.info('已取消');
    });
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--border-color);
  .left {
    width: 60px;
    height: 100%;
  }
  .center {
    flex: 1;
    height: 100%;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  }
  .right {
    width: 80px;
    height: 100%;
  }
}
</style>
