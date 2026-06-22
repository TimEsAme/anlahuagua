<template>
  <div class="layout-container flex">
    <!-- 选择具体的业务组件 -->
    <div class="left flex wrap space-between">
      <slot />
    </div>
    <!-- 显示对应的业务组件 -->
    <div class="center">
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          :status="store.coms[store.currentMaterialCom].status"
          :serialNum="1"
        />
      </router-view>
    </div>
    <!-- 编辑面板 -->
    <div class="right">
      <EditPannel :com="currentCom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EditPannel from '@/components/surveyComs/EditItems/EditPannel.vue';
import { dispatchStatus } from '@/stores/dispatch';
import { useMaterialStore } from '@/stores/useMaterial';
import { type MaterialStore, type OptionsStatus, type PicLink, type TypeStatus } from '@/types';
import { computed, provide } from 'vue';

const store = useMaterialStore() as unknown as MaterialStore;

const currentCom = computed(() => store.coms[store.currentMaterialCom]);

const updateStatus = (
  configKey: string,
  payload?: string | number | boolean | object,
  name?: string,
) => {
  // switch (configKey) {
  //   case 'title':
  //   case 'desc': {
  //     if (typeof payload !== 'string') {
  //       console.error('Invalid payload type for title or desc expected string');
  //     }
  //     store.setTextStatus(currentCom.value.status[configKey], payload as string);
  //     break;
  //   }
  //   case 'options': {
  //     if (IsOptionsStatus(currentCom.value.status))
  //       if (typeof payload === 'number' && IsOptionsStatus(currentCom.value.status)) {
  //         const res = store.removeOption(currentCom.value.status[configKey], payload);
  //         if (res) {
  //           ElMessage.success('删除成功');
  //         } else {
  //           ElMessage.error('至少保留两个选项');
  //         }
  //       } else if (typeof payload === 'object' && isPicLink(payload)) {
  //         store.setPicLinkByIndex(currentCom.value.status[configKey], payload);
  //       } else if (typeof payload === 'object' && isOptionsStatusByIndexPayload(payload)) {
  //         store.setOptionsStatusByIndex(currentCom.value.status[configKey], payload);
  //       } else if (typeof payload === 'boolean') {
  //         store.setUse(currentCom.value.status[configKey], payload);
  //       } else {
  //         store.addOption(currentCom.value.status[configKey]);
  //       }

  //     break;
  //   }
  //   case 'position': {
  //     if (typeof payload !== 'number') {
  //       console.error('Invalid payload type for position expected number');
  //     } else {
  //       store.setPosition(currentCom.value.status[configKey], payload);
  //     }
  //     break;
  //   }
  //   case 'titleSize':
  //   case 'descSize': {
  //     if (typeof payload !== 'number') {
  //       console.error('Invalid payload type for position expected number');
  //     } else {
  //       store.setCurrentStatus(currentCom.value.status[configKey], payload);
  //     }
  //     break;
  //   }
  //   case 'titleWeight':
  //   case 'descWeight': {
  //     if (typeof payload !== 'number') {
  //       console.error('Invalid payload type for position expected number');
  //     } else {
  //       store.setWeight(currentCom.value.status[configKey], payload);
  //     }
  //     break;
  //   }
  //   case 'titleItalic':
  //   case 'descItalic': {
  //     if (typeof payload !== 'number') {
  //       console.error('Invalid payload type for position expected number');
  //     } else {
  //       store.seyItalic(currentCom.value.status[configKey], payload);
  //     }
  //     break;
  //   }
  //   case 'titleColor':
  //   case 'descColor': {
  //     if (typeof payload !== 'string') {
  //       console.error('Invalid payload type for position expected string');
  //     } else {
  //       store.setColor(currentCom.value.status[configKey], payload);
  //     }
  //     break;
  //   }
  //   case 'type': {
  //     if (
  //       typeof payload == 'number' &&
  //       IsTypeStatus(currentCom.value.status) &&
  //       currentCom.value.name === 'text-note'
  //     ) {
  //       changeEditorIsShowStatus(currentCom.value.status, payload);
  //       store.setCurrentStatus(currentCom.value.status[configKey], payload);
  //     } else if (
  //       typeof payload == 'number' &&
  //       IsTypeStatus(currentCom.value.status) &&
  //       currentCom.value.name === 'text-input'
  //     ) {
  //       store.setTextType(currentCom.value.status[configKey], payload);
  //       store.setCurrentStatus(currentCom.value.status[configKey], payload);
  //     }

  //     break;
  //   }
  // }

  const status = store.coms[store.currentMaterialCom].status as unknown as
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
.layout-container {
  width: 100%;
  // Header组件高度50px，h1高度50px，上下margin 20px，最后20px是额外多减去一部分，避免贴底
  height: calc(100vh - 100px - 40px - 20px);
  align-items: flex-start;
  border: 1px solid var(--border-color);
  border-top-right-radius: var(--border-radius-lg);
  border-bottom-left-radius: var(--border-radius-lg);
  border-bottom-right-radius: var(--border-radius-lg);
}
.left {
  width: 180px;
  text-align: center;
  align-items: flex-start;
  padding: 20px;
}
.center {
  width: 550px;
  // 多减去的60px是上下的padding，，最后20px是额外多减去一部分，避免贴底
  height: calc(100vh - 100px - 40px - 60px - 20px);
  overflow-y: auto;
  padding: 30px;
  border-left: 1px solid var(--border-color);
}
.right {
  width: 350px;
  height: calc(100vh - 100px - 40px - 20px);
  overflow-y: auto;
  border-left: 1px solid var(--border-color);
}
</style>
