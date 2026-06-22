import type {
  TextProps,
  OptionsProps,
  PicLink,
  Status,
  optionsStatusByIndexPayload,
  ComType,
  SurveyDBData,
} from '@/types';
// 题目类型
export type SurveyComName =
  | 'date-time'
  | 'rate-score'
  | 'text-input'
  | 'single-select'
  | 'multiple-select'
  | 'option-select'
  | 'single-pic-select'
  | 'multi-pic-select'
  | 'personal-info-gender'
  | 'personal-info-education'
  | 'personal-info-tel';

// 业务组件类型(题目类型 + 非题目类型)
export type Material = SurveyComName | 'text-note';

// 编辑组件类型
export type EditComName =
  | 'color-editor'
  | 'title-editor'
  | 'desc-editor'
  | 'position-editor'
  | 'size-editor'
  | 'weight-editor'
  | 'italic-editor'
  | 'text-input-type-editor'
  | 'text-type-editor'
  | 'pic-options-editor'
  | 'date-time'
  | 'rate-text-editor'
  | 'options-editor';

export type componentName = Material | EditComName;

export type ComponentMap = {
  [key in componentName]: ComType;
};

export interface Actions {
  setTextStatus: (textProps: TextProps, text: string) => void;
  addOption: (optionProps: OptionsProps) => void;
  removeOption: (optionProps: OptionsProps, index: number) => number;
  setPosition: (optionProps: OptionsProps, index: number) => void;
  setCurrentStatus: (optionProps: OptionsProps, index: number) => void;
  setWeight: (optionProps: OptionsProps, index: number) => void;
  seyItalic: (optionProps: OptionsProps, index: number) => void;
  setTextType: (optionProps: OptionsProps, index: number) => void;
  setColor: (textProps: TextProps, color: string) => void;
  setUse: (optionProps: OptionsProps, isUse: boolean) => void;
  setPicLinkByIndex: (optionProps: OptionsProps, payload: PicLink) => void;
  changeEditorIsShowStatus: (optionProps: OptionsProps, index: number) => void;
  setOptionsStatusByIndex: (
    optionsProps: OptionsProps,
    payload: optionsStatusByIndexPayload,
  ) => void;
  setDateType: (optionProps: OptionsProps, index: number) => void;
}

// 仓库状态
export interface MaterialStore extends Actions {
  currentMaterialCom: Material;
  coms: Record<Material, Status>;
  setCurrentSurveyCom: (com: Material) => void;
}

export interface EditorStore extends Actions {
  currentComponentIndex: number;
  surveyCount: number;
  coms: Status[];
  setCurrentComponentIndex: (index: number) => void;
  addCom: (coms: Status[], newCom: Status) => void;
  setStore: (data: SurveyDBData) => void;
  resetComs: () => void;
}

export const SurveyComNameArr = [
  'date-time',
  'rate-score',
  'text-input',
  'single-select',
  'multiple-select',
  'option-select',
  'single-pic-select',
  'multi-pic-select',
  'personal-info-gender',
  'personal-info-tel',
  'personal-info-education',
];

// 判断传入的是否为题目类型
export function isSurveyComName(name: string): name is SurveyComName {
  return SurveyComNameArr.includes(name as SurveyComName);
}

export const PdfCom = [
  'date-time',
  'rate-score',
  'text-input',
  'single-select',
  'multiple-select',
  'option-select',
  'single-pic-select',
  'multi-pic-select',
  'personal-info-gender',
  'personal-info-tel',
  'personal-info-education',
];

// 判断传入的是否为题目类型
export function isPdfCom(name: string): boolean {
  return PdfCom.includes(name);
}
