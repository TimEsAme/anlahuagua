import { defineStore } from 'pinia';
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap';
import {
  addOption,
  setTextStatus,
  removeOption,
  setPosition,
  setCurrentStatus,
  setWeight,
  seyItalic,
  setColor,
  setPicLinkByIndex,
  setTextType,
  setUse,
  setDateType,
} from './actions';
import { updateInitStatusBeforeAdd } from '@/utils';
import type { Material, Status } from '@/types';

// updateInitStatusBeforeAdd
const keyToInit = [
  'personal-info-gender',
  'personal-info-education',
  'personal-info-tel',
] as Material[];
const initializedStatus: { [key: string]: Status } = {};
keyToInit.forEach((key) => {
  const defalutStatus = defaultStatusMap[key]();
  // console.log(defalutStatus, 11111);

  updateInitStatusBeforeAdd(defalutStatus, key);
  initializedStatus[key] = defalutStatus;
});

export const useMaterialStore = defineStore('materials', {
  state: () => ({
    currentMaterialCom: 'single-select',
    coms: {
      // 选择
      // 单选
      'single-select': defaultStatusMap['single-select'](),
      // 多选
      'multiple-select': defaultStatusMap['multiple-select'](),
      // 下拉选择单选
      'option-select': defaultStatusMap['option-select'](),
      // 图片单选
      'single-pic-select': defaultStatusMap['single-pic-select'](),
      // 图片多选
      'multi-pic-select': defaultStatusMap['multi-pic-select'](),

      // 备注说明
      'text-note': defaultStatusMap['text-note'](),
      // 日期时间
      'date-time': defaultStatusMap['date-time'](),
      // 文本输入
      'text-input': defaultStatusMap['text-input'](),

      // 评价打分
      'rate-score': defaultStatusMap['rate-score'](),

      // 个人信息
      // 性别
      'personal-info-gender': initializedStatus['personal-info-gender'],
      // 学历
      'personal-info-education': initializedStatus['personal-info-education'],

      // 电话
      'personal-info-tel': initializedStatus['personal-info-tel'],
    },
  }),
  actions: {
    setTextStatus,
    addOption,
    removeOption,
    setPosition,
    setCurrentStatus,
    setWeight,
    seyItalic,
    setColor,
    setPicLinkByIndex,
    setTextType,
    setUse,
    setDateType,
    // 根据当前路由切换当前编辑的组件
    setCurrentMaterialCom(comName: string) {
      this.currentMaterialCom = comName;
    },
  },
});
