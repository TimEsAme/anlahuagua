import {
  IsPicTitleDescStatusArr,
  IsStringArr,
  type OptionsProps,
  type optionsStatusByIndexPayload,
  type PicLink,
  type TextProps,
} from '@/types';

export function setTextStatus(textProps: TextProps, text: string) {
  textProps.status = text;
}

export function addOption(optionsProps: OptionsProps) {
  if (IsStringArr(optionsProps.status)) {
    let last = optionsProps.status[optionsProps.status.length - 1];
    let num = last ? parseInt(last.slice(-1)) || 0 : 0;
    optionsProps.status.push(`默认选项${num + 1}`);
  } else if (IsPicTitleDescStatusArr(optionsProps.status)) {
    let last = optionsProps.status[optionsProps.status.length - 1];
    let num = last ? parseInt(last.picTitle.slice(-1)) || 0 : 0;
    optionsProps.status.push({
      picTitle: `图片标题${num + 1}`,
      picDesc: `图片描述${num + 1}`,
      value: '',
    });
  }
}

export function removeOption(optionsProps: OptionsProps, index: number) {
  if (optionsProps.status.length === 2) {
    return false;
  } else {
    optionsProps.status.splice(index, 1);
    return true;
  }
}

export function setPosition(optionsProps: OptionsProps, index: number) {
  optionsProps.currentStatus = index;
}

export function setCurrentStatus(optionsProps: OptionsProps, index: number) {
  optionsProps.currentStatus = index;
}

export function setWeight(optionsProps: OptionsProps, index: number) {
  optionsProps.currentStatus = index;
}

export function seyItalic(optionsProps: OptionsProps, index: number) {
  optionsProps.currentStatus = index;
}

export function setColor(textProps: TextProps, color: string) {
  textProps.status = color;
}

export function setTextType(typeProps: OptionsProps, index: number) {
  typeProps.currentStatus = index;
}

export function setUse(typeProps: OptionsProps, isUse: boolean) {
  typeProps.isUse = isUse;
}

export function setOptionsStatusByIndex(
  optionsProps: OptionsProps,
  payload: optionsStatusByIndexPayload,
) {
  optionsProps.status[payload.index] = payload.val;
}

export function setPicLinkByIndex(optionsProps: OptionsProps, payload: PicLink) {
  if (IsPicTitleDescStatusArr(optionsProps.status)) {
    optionsProps.status[payload.index]!.value = payload.link;
  }
}

export function setDateType(optionsProps: OptionsProps, index: number) {
  optionsProps.currentStatus = index;
}
