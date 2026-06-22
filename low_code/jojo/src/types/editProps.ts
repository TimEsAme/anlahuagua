import type { ComType } from './common';

export interface BaseProps {
  id: string;
  name: string;
  isShow: boolean;
  editCom: ComType;
  isUse?: boolean;
}

export interface TextProps extends BaseProps {
  status: string;
}

export type stringStatusArr = string[];
export type valueStatusArr = Array<{ value: string; status: string }>;

export type PicTitleDescStatusArr = Array<{ picTitle: string; picDesc: string; value: string }>;

export type StatusArray = stringStatusArr | valueStatusArr | PicTitleDescStatusArr;

export interface OptionsProps extends BaseProps {
  currentStatus: number;
  status: stringStatusArr | valueStatusArr | PicTitleDescStatusArr;
}

// 公共设置
export interface BaseStatus {
  title: TextProps;
  desc: TextProps;
  position: OptionsProps;
  titleSize: OptionsProps;
  descSize: OptionsProps;
  titleWeight: OptionsProps;
  descWeight: OptionsProps;
  titleItalic: OptionsProps;
  descItalic: OptionsProps;
  titleColor: TextProps;
  descColor: TextProps;
}

export interface OptionsStatus extends BaseStatus {
  options: OptionsProps;
}

export interface TypeStatus extends BaseStatus {
  type: OptionsProps;
}

export function IsOptionsStatus(status: BaseStatus): status is OptionsStatus {
  return 'options' in status;
}

export function IsTypeStatus(status: BaseStatus): status is TypeStatus {
  return 'type' in status;
}

// 确定status是字符串数组
export function IsStringArr(status: StatusArray): status is string[] {
  return Array.isArray(status) && typeof status[0] === 'string';
}

// 确定status是{picTitle: string; picDesc: string; value: string}数组
export function IsPicTitleDescStatusArr(
  status: StatusArray,
): status is Array<{ picTitle: string; picDesc: string; value: string }> {
  return (
    Array.isArray(status) &&
    typeof status[0] === 'object' &&
    'picTitle' in status[0] &&
    'picDesc' in status[0] &&
    'value' in status[0]
  );
}

// 确定status是{value: string; status: string}数组
export function IsValueStatusArr(
  status: StatusArray,
): status is Array<{ value: string; status: string }> {
  return (
    Array.isArray(status) &&
    typeof status[0] === 'object' &&
    'value' in status[0] &&
    'status' in status[0]
  );
}

// 确定link是picLink类型
export type PicLink = { index: number; link: string };
export function isPicLink(link: object): link is PicLink {
  return 'link' in link && 'index' in link;
}

// GetLink 方法的类型
export type GetLink = (obj: PicLink) => void;

// updatestatus 方法的类型
export type UpdateStatus = (
  configKey: string,
  payload?: string | number | boolean | PicLink,
  name?: string,
) => void;

export type optionsStatusByIndexPayload = {
  val: string;
  index: number;
};

export function isOptionsStatusByIndexPayload(obj: object): obj is optionsStatusByIndexPayload {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'val' in obj &&
    typeof (obj as optionsStatusByIndexPayload).val === 'string' &&
    'index' in obj &&
    typeof (obj as optionsStatusByIndexPayload).index === 'number'
  );
}

export function isOptionsProps(props: OptionsProps): props is OptionsProps {
  return props && Array.isArray(props.status);
}
