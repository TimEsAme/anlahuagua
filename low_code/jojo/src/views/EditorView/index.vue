<template>
  <div>
    <div class="header">
      <Header
        :isEdit="true"
        :id="id"
      />
    </div>
    <div class="container">
      <LeftSide :id="id" />
      <RightSide />
    </div>
    <div>
      <Center />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Common/Header.vue';
import LeftSide from './LeftSide/index.vue';
import RightSide from './RightSide.vue';
import Center from './Center.vue';
import { useEditorStore } from '@/stores/useEditor';
import { useRoute } from 'vue-router';
import { computed, provide } from 'vue';
import { restoreComponentsStatus } from '@/utils';
import { getSurveyById } from '@/db/operation';
import type { EditorStore, OptionsStatus, PicLink, TypeStatus } from '@/types';
import { dispatchStatus } from '@/stores/dispatch';
import { ElMessage } from 'element-plus';

const route = useRoute();
const store = useEditorStore() as unknown as EditorStore;

const id = computed(() => (route.params.id ? String(route.params.id) : ''));

if (id.value) {
  getSurveyById(Number(id.value)).then((res) => {
    if (res) {
      restoreComponentsStatus(res.coms);
      store.setStore(res);
    }
  });
} else {
  store.resetComs();
}

const updateStatus = (
  configKey: string,
  payload?: string | number | boolean | object,
  name?: string,
) => {
  if (store.currentComponentIndex === -1) {
    ElMessage({
      message: '请先将组件处于编辑状态',
      type: 'warning',
    });
    return;
  }

  const status = store.coms[store.currentComponentIndex]?.status as unknown as
    | TypeStatus
    | OptionsStatus;

  dispatchStatus(store, status, configKey, payload, name);
};

const getLink = (link: PicLink) => {
  updateStatus('options', link);
};
provide('updateStatus', updateStatus);
provide('getLink', getLink);
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  background-color: var(--white);
  position: fixed;
  top: 0;
  z-index: 10;
}
.container {
  width: calc(100vw - 40px);
  padding: 20px;
  // Header的高度50px，上下padding 20px
  height: calc(100vh - 50px - 40px);
  background: url('../../assets/img/editor_background.png');
  background-size: cover;
  position: fixed;
  top: 50px;
}
</style>
