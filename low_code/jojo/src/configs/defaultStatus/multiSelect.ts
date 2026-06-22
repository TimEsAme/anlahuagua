// 业务组件
import MultiSelect from '@/components/surveyComs/Materials/SelectComs/MultiSelect.vue';
// 编辑组件
import ColorEditor from '@/components/surveyComs/EditItems/ColorEditor.vue';
import DescEditor from '@/components/surveyComs/EditItems/DescEditor.vue';
import ItalicEditor from '@/components/surveyComs/EditItems/ItalicEditor.vue';
import OptionsEditor from '@/components/surveyComs/EditItems/OptionsEditor.vue';
import PositionEditor from '@/components/surveyComs/EditItems/PositionEditor.vue';
import SizeEditor from '@/components/surveyComs/EditItems/SizeEditor.vue';
import TitleEditor from '@/components/surveyComs/EditItems/TitleEditor.vue';
import WeightEditor from '@/components/surveyComs/EditItems/WeightEditor.vue';
// uuid
import { v4 as uuidv4 } from 'uuid';
import { markRaw } from 'vue';

export default function () {
  return {
    type: markRaw(MultiSelect),
    id: uuidv4(),
    name: 'multiple-select',
    status: {
      title: {
        id: uuidv4(),
        name: 'title-editor',
        isShow: true,
        editCom: markRaw(TitleEditor),
        status: '默认多选题标题',
      },
      desc: {
        id: uuidv4(),
        name: 'desc-editor',
        isShow: true,
        editCom: markRaw(DescEditor),
        status: '默认多选题描述内容',
      },
      options: {
        id: uuidv4(),
        currentStatus: 0,
        isShow: true,
        name: 'options-editor',
        editCom: markRaw(OptionsEditor),
        status: ['默认选项1', '默认选项2'],
      },
      position: {
        id: uuidv4(),
        currentStatus: 0,
        isShow: true,
        name: 'position-editor',
        editCom: markRaw(PositionEditor),
        status: ['左对齐', '居中对齐'],
      },
      titleSize: {
        id: uuidv4(),
        currentStatus: 0,
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
        status: ['22', '20', '18'],
      },
      descSize: {
        id: uuidv4(),
        currentStatus: 0,
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
        status: ['16', '14', '12'],
      },
      titleWeight: {
        id: uuidv4(),
        currentStatus: 1,
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
        status: ['加粗', '正常'],
      },
      descWeight: {
        id: uuidv4(),
        currentStatus: 1,
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
        status: ['加粗', '正常'],
      },
      titleItalic: {
        id: uuidv4(),
        currentStatus: 1,
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
        status: ['斜体', '正常'],
      },
      descItalic: {
        id: uuidv4(),
        currentStatus: 1,
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
        status: ['斜体', '正常'],
      },
      titleColor: {
        id: uuidv4(),
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
        status: '#000',
      },
      descColor: {
        id: uuidv4(),
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
        status: '#909399',
      },
    },
  };
}
