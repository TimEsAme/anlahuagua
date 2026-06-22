import { ElMessage } from 'element-plus';
import {
  IsOptionsStatus,
  isOptionsStatusByIndexPayload,
  isPicLink,
  IsTypeStatus,
  type EditorStore,
  type MaterialStore,
  type OptionsStatus,
  type TypeStatus,
} from '@/types';
import { changeEditorIsShowStatus } from '@/utils';

export function dispatchStatus(
  store: EditorStore | MaterialStore,
  status: TypeStatus | OptionsStatus,
  configKey: string,
  payload?: string | number | boolean | object,
  name?: string,
) {
  switch (configKey) {
    case 'type': {
      if (typeof payload == 'number' && IsTypeStatus(status) && name === 'text-type-editor') {
        changeEditorIsShowStatus(status, payload);
        store.setCurrentStatus(status[configKey], payload);
      } else if (
        typeof payload == 'number' &&
        IsTypeStatus(status) &&
        name === 'text-input-type-editor'
      ) {
        store.setTextType(status[configKey], payload);
        store.setCurrentStatus(status[configKey], payload);
      } else if (
        typeof payload == 'number' &&
        IsTypeStatus(status) &&
        name === 'date-time-type-editor'
      ) {
        store.setDateType(status[configKey], payload);
      }
      break;
    }
    case 'title':
    case 'desc': {
      if (typeof payload !== 'string') {
        console.error('Invalid payload type for title or desc expected string');
      }
      store.setTextStatus(status[configKey], payload as string);
      break;
    }
    case 'options': {
      if (IsOptionsStatus(status))
        if (typeof payload === 'number' && IsOptionsStatus(status)) {
          const res = store.removeOption(status[configKey], payload);
          if (res) {
            ElMessage.success('删除成功');
          } else {
            ElMessage.error('至少保留两个选项');
          }
        } else if (typeof payload === 'object' && isPicLink(payload)) {
          store.setPicLinkByIndex(status[configKey], payload);
        } else if (typeof payload === 'object' && isOptionsStatusByIndexPayload(payload)) {
          store.setOptionsStatusByIndex(status[configKey], payload);
        } else if (typeof payload === 'boolean') {
          store.setUse(status[configKey], payload);
        } else {
          store.addOption(status[configKey]);
        }

      break;
    }
    case 'position': {
      if (typeof payload !== 'number') {
        console.error('Invalid payload type for position expected number');
      } else {
        store.setPosition(status[configKey], payload);
      }
      break;
    }
    case 'titleSize':
    case 'descSize': {
      if (typeof payload !== 'number') {
        console.error('Invalid payload type for position expected number');
      } else {
        store.setCurrentStatus(status[configKey], payload);
      }
      break;
    }
    case 'titleWeight':
    case 'descWeight': {
      if (typeof payload !== 'number') {
        console.error('Invalid payload type for position expected number');
      } else {
        store.setWeight(status[configKey], payload);
      }
      break;
    }
    case 'titleItalic':
    case 'descItalic': {
      if (typeof payload !== 'number') {
        console.error('Invalid payload type for position expected number');
      } else {
        store.seyItalic(status[configKey], payload);
      }
      break;
    }
    case 'titleColor':
    case 'descColor': {
      if (typeof payload !== 'string') {
        console.error('Invalid payload type for position expected string');
      } else {
        store.setColor(status[configKey], payload);
      }
      break;
    }
  }
}
