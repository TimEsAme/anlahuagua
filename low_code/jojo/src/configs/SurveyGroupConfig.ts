// 题型面板对应配置文件
import {
  CircleCheck,
  Files,
  EditPen,
  ChatLineSquare,
  User,
  Message,
} from '@element-plus/icons-vue';

export const SurveyComsList = [
  {
    title: '选择题',
    icon: CircleCheck,
    list: [
      { materialName: 'single-select', comName: '单选' },
      { materialName: 'multiple-select', comName: '多选' },
      { materialName: 'option-select', comName: '下拉' },
      { materialName: 'single-pic-select', comName: '图片单选' },
      { materialName: 'multi-pic-select', comName: '图片多选' },
    ],
  },
  {
    title: '文本输入',
    icon: EditPen,
    list: [{ materialName: 'text-input', comName: '文本输入' }],
  },
  {
    title: '高级题型',
    icon: Files,
    list: [{ materialName: 'rate-score', comName: '评价打分' }],
  },
  {
    title: '备注说明',
    icon: ChatLineSquare,
    list: [
      {
        materialName: 'text-note',
        comName: '备注说明',
      },
      {
        materialName: 'date-time',
        comName: '时间日期',
      },
    ],
  },
  {
    title: '个人信息',
    icon: User,
    list: [
      { materialName: 'personal-info-gender', comName: '性别' },
      { materialName: 'personal-info-education', comName: '学历' },
    ],
  },
  {
    title: '联系方式',
    icon: Message,
    list: [{ materialName: 'personal-info-tel', comName: '手机' }],
  },
];
