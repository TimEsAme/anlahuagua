<template>
  <div class="right-side-container">
    <div
      v-if="store.currentComponentIndex === -1"
      class="content flex justify-content-center align-items-center"
    >
      点击题型进行编辑
    </div>
    <div v-else>
      <EditPannel :com="currentCom" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditPannel from '@/components/surveyComs/EditItems/EditPannel.vue';
import { useEditorStore } from '@/stores/useEditor';
import { computed, provide } from 'vue';

import {
  type EditorStore,
  type OptionsStatus,
  type PicLink,
  type Status,
  type TypeStatus,
} from '@/types';
import { dispatchStatus } from '@/stores/dispatch';

const store = useEditorStore() as unknown as EditorStore;

const currentCom = computed(() => store.coms[store.currentComponentIndex] as Status);

// const updateStatus = (
//   configKey: string,
//   payload?: string | number | boolean | object,
//   name?: string,
// ) => {
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

//   const status = store.coms[store.currentComponentIndex]?.status as unknown as
//     | TypeStatus
//     | OptionsStatus;
//   dispatchStatus(store, status, configKey, payload, name);
// };

// const getLink = (link: PicLink) => {
//   updateStatus('options', link);
// };
// provide('updateStatus', updateStatus);
// provide('getLink', getLink);
</script>

<style scoped lang="scss">
.right-side-container {
  width: 320px;
  height: calc(100vh - 50px - 40px);
  position: fixed;
  right: 20px;
  top: 70px;
  background-color: var(--white);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  overflow-y: auto;
}
.content {
  height: 100%;
}
</style>
