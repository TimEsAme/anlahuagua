import { defineAsyncComponent, markRaw } from 'vue';
import type { ComponentMap } from '@/types';

// 创建 markRaw 包装的异步组件
const markAsyncComponent = (loader: () => Promise<any>) => {
  return markRaw(defineAsyncComponent(loader));
};

export const componentMap: ComponentMap = {
  // 业务组件 - 全部用 markAsyncComponent 包装
  'single-select': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
  ),
  'multiple-select': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/MultiSelect.vue'),
  ),
  'option-select': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/OptionSelect.vue'),
  ),
  'single-pic-select': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/SinglePicSelect.vue'),
  ),
  'multi-pic-select': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/MultiPicSelect.vue'),
  ),
  'text-note': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/NoteComs/TextNote.vue'),
  ),
  'text-input': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/InputComs/TextInput.vue'),
  ),
  'rate-score': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/AdvancedComs/RateScore.vue'),
  ),
  'date-time': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/AdvancedComs/DateTime.vue'),
  ),
  'personal-info-gender': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
  ),
  'personal-info-education': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/SelectComs/SingleSelect.vue'),
  ),
  'personal-info-tel': markAsyncComponent(
    () => import('@/components/surveyComs/Materials/InputComs/TextInput.vue'),
  ),

  // 编辑组件
  'color-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/ColorEditor.vue'),
  ),
  'desc-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/DescEditor.vue'),
  ),
  'italic-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/ItalicEditor.vue'),
  ),
  'options-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/OptionsEditor.vue'),
  ),
  'pic-options-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/PicOptionsEditor.vue'),
  ),
  'position-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/PositionEditor.vue'),
  ),
  'rate-text-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/RateTextEditor.vue'),
  ),
  'size-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/SizeEditor.vue'),
  ),
  'text-input-type-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/TextInputTypeEditor.vue'),
  ),
  'text-type-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/TextTypeEditor.vue'),
  ),
  'title-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/TitleEditor.vue'),
  ),
  'weight-editor': markAsyncComponent(
    () => import('@/components/surveyComs/EditItems/WeightEditor.vue'),
  ),
};
