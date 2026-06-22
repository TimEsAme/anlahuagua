import type { defineComponent } from 'vue';
import type { BaseStatus, OptionsProps, OptionsStatus, TextProps, TypeStatus } from './editProps';

// 导出vue组件类型
export type ComType = ReturnType<typeof defineComponent>;

//
export interface Status {
  type: ComType;
  id: string;
  name: string;
  status: {
    [key: string]: TextProps | OptionsProps;
  };
}
