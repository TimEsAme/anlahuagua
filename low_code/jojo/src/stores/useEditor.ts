import { defineStore } from 'pinia';
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
  setOptionsStatusByIndex,
  setDateType,
} from './actions';
import { isSurveyComName, type Status, type SurveyDBData, type TypeStatus } from '@/types';
import { markRaw } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import TextTypeEditor from '@/components/surveyComs/EditItems/TextTypeEditor.vue';
import TitleEditor from '@/components/surveyComs/EditItems/TitleEditor.vue';
import DescEditor from '@/components/surveyComs/EditItems/DescEditor.vue';
import PositionEditor from '@/components/surveyComs/EditItems/PositionEditor.vue';
import SizeEditor from '@/components/surveyComs/EditItems/SizeEditor.vue';
import WeightEditor from '@/components/surveyComs/EditItems/WeightEditor.vue';
import ItalicEditor from '@/components/surveyComs/EditItems/ItalicEditor.vue';
import ColorEditor from '@/components/surveyComs/EditItems/ColorEditor.vue';
import textNoteDefaultStatus from '@/configs/defaultStatus/TextNote';
import { deleteSurvey, saveSurvey, updateSurvey } from '@/db/operation';
// 仓库初始化
const initStore = () => [
  Object.assign({}, textNoteDefaultStatus(), {
    status: <TypeStatus>{
      type: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['标题', '段落'],
        isShow: true,
        editCom: markRaw(TextTypeEditor),
        name: 'text-type-editor',
      },
      title: {
        id: uuidv4(),
        status: '问卷标题',
        isShow: true,
        editCom: markRaw(TitleEditor),
        name: 'title-editor',
      },
      desc: {
        id: uuidv4(),
        status: '默认描述内容',
        isShow: false,
        editCom: DescEditor,
        name: 'desc-editor',
      },
      position: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['左对齐', '居中对齐'],
        isShow: false,
        editCom: markRaw(PositionEditor),
        name: 'position-editor',
      },
      titleSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['26', '24', '22'],
        isShow: true,
        editCom: markRaw(SizeEditor),
        name: 'size-editor',
      },
      descSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['16', '14', '12'],
        isShow: false,
        editCom: markRaw(SizeEditor),
        name: 'size-editor',
      },
      titleWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: true,
        editCom: markRaw(WeightEditor),
        name: 'weight-editor',
      },
      descWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: false,
        editCom: markRaw(WeightEditor),
        name: 'weight-editor',
      },
      titleItalic: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['斜体', '正常'],
        isShow: true,
        editCom: markRaw(ItalicEditor),
        name: 'italic-editor',
      },
      descItalic: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['斜体', '正常'],
        isShow: false,
        editCom: markRaw(ItalicEditor),
        name: 'italic-editor',
      },
      titleColor: {
        id: uuidv4(),
        status: '#000',
        isShow: true,
        editCom: markRaw(ColorEditor),
        name: 'color-editor',
      },
      descColor: {
        id: uuidv4(),
        status: '#909399',
        isShow: false,
        editCom: markRaw(ColorEditor),
        name: 'color-editor',
      },
    },
  }),
  Object.assign({}, textNoteDefaultStatus(), {
    status: <TypeStatus>{
      type: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['标题', '段落'],
        isShow: true,
        editCom: markRaw(TextTypeEditor),
        name: 'text-type-editor',
      },
      title: {
        id: uuidv4(),
        status: '默认标题内容',
        isShow: false,
        editCom: markRaw(TitleEditor),
        name: 'title-editor',
      },
      desc: {
        id: uuidv4(),
        status:
          '为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！',
        isShow: true,
        editCom: markRaw(DescEditor),
        name: 'desc-editor',
      },
      position: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['左对齐', '居中对齐'],
        isShow: true,
        editCom: markRaw(PositionEditor),
        name: 'position-editor',
      },
      titleSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['26', '24', '22'],
        isShow: false,
        editCom: markRaw(SizeEditor),
        name: 'size-editor',
      },
      descSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['16', '14', '12'],
        isShow: true,
        editCom: markRaw(SizeEditor),
        name: 'size-editor',
      },
      titleWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: false,
        editCom: markRaw(WeightEditor),
        name: 'weight-editor',
      },
      descWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: true,
        editCom: markRaw(WeightEditor),
        name: 'weight-editor',
      },
      titleItalic: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['斜体', '正常'],
        isShow: false,
        editCom: markRaw(ItalicEditor),
        name: 'italic-editor',
      },
      descItalic: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['斜体', '正常'],
        isShow: true,
        editCom: markRaw(ItalicEditor),
        name: 'italic-editor',
      },
      titleColor: {
        id: uuidv4(),
        status: '#000',
        isShow: false,
        editCom: markRaw(ColorEditor),
        name: 'color-editor',
      },
      descColor: {
        id: uuidv4(),
        status: '#909399',
        isShow: true,
        editCom: markRaw(ColorEditor),
        name: 'color-editor',
      },
    },
  }),
];

export const useEditorStore = defineStore('editor', {
  state() {
    return {
      //   当前选中组件
      currentComponentIndex: -1,
      //   问卷题目数量
      surveyCount: 0,
      //   题目数组
      coms: initStore() as unknown as Status[],
    };
  },
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
    setOptionsStatusByIndex,
    setDateType,
    addCom(newCom: Status) {
      this.coms.push(newCom);
      this.currentComponentIndex = -1;
      if (isSurveyComName(newCom.name)) this.surveyCount++;
    },
    setCurrentComponentIndex(index: number) {
      this.currentComponentIndex = index;
    },
    removeCom(index: number) {
      if (this.coms[index] && isSurveyComName(this.coms[index].name)) {
        this.surveyCount--;
      }
      this.coms.splice(index, 1);
    },
    // 重置问卷
    resetComs() {
      this.coms = initStore() as unknown as Status[];
      this.surveyCount = 0;
      this.currentComponentIndex = -1;
    },
    // 保存新问卷
    saveComs(data: SurveyDBData) {
      return saveSurvey(data);
    },
    // 还原为初始状态
    setStore(data: SurveyDBData) {
      this.coms = data.coms;
      this.surveyCount = data.surveyCount;
      this.currentComponentIndex = -1;
    },
    // 更新问卷
    updateComs(id: number, data: Partial<SurveyDBData>) {
      return updateSurvey(id, data);
    },
    // 删除问卷
    removeComs(id: number) {
      return deleteSurvey(id);
    },
  },
});
