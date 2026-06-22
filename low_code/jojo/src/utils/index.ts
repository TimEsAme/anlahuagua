import { componentMap } from '@/configs/componentMap';
import { educationStatus, genderStatus } from '@/configs/defaultStatus/initStatus';
import type { componentName, EditComName, Material, Status, SurveyDBData } from '@/types';
import {
  isOptionsProps,
  IsOptionsStatus,
  IsPicTitleDescStatusArr,
  IsStringArr,
  IsValueStatusArr,
  type OptionsProps,
  type TextProps,
  type TypeStatus,
} from '@/types/editProps';
import type { TableColumnCtx } from 'element-plus';

export function getTextStatus(props: TextProps) {
  return props.status;
}

export function getStringStatus(props: OptionsProps) {
  if (props && IsStringArr(props.status)) {
    return props.status;
  }
}

export function getPicTitleDescStatusArr(props: OptionsProps) {
  if (props && IsPicTitleDescStatusArr(props.status)) {
    return props.status;
  }
}

export function getValueStatusArr(props: OptionsProps) {
  if (props && IsValueStatusArr(props.status)) {
    return props.status;
  }
}

export function getCurrentStatus(props: OptionsProps) {
  return props && props.currentStatus;
}

export function getStringStatusByCurrent(props: OptionsProps) {
  if (props && IsStringArr(props.status)) {
    return props.status[props.currentStatus];
  }
}

export function getValueStatusByCurrentStatus(props: OptionsProps) {
  if (
    props &&
    isOptionsProps(props) &&
    (IsValueStatusArr(props.status) || IsPicTitleDescStatusArr(props.status))
  ) {
    return props.status[props.currentStatus];
  }
}

export function changeEditorIsShowStatus(props: TypeStatus, type: number) {
  if (type !== props.type.currentStatus) {
    props.title.isShow = !props.title.isShow;
    props.desc.isShow = !props.desc.isShow;
    props.position.isShow = !props.position.isShow;
    props.titleSize.isShow = !props.titleSize.isShow;
    props.descSize.isShow = !props.descSize.isShow;
    props.titleWeight.isShow = !props.titleWeight.isShow;
    props.descWeight.isShow = !props.descWeight.isShow;
    props.titleItalic.isShow = !props.titleItalic.isShow;
    props.descItalic.isShow = !props.descItalic.isShow;
    props.titleColor.isShow = !props.titleColor.isShow;
    props.descColor.isShow = !props.descColor.isShow;
  }
}

export function updateInitStatusBeforeAdd(comStatus: Status, newMaterialName: Material) {
  switch (newMaterialName) {
    case 'personal-info-gender': {
      comStatus.name = 'personal-info-gender';
      comStatus.status.title!.status = '你的性别是';
      comStatus.status.options!.status = genderStatus();

      break;
    }
    case 'personal-info-education': {
      comStatus.name = 'personal-info-education';
      comStatus.status.title!.status = '你的学历是';
      comStatus.status.options!.status = educationStatus();

      break;
    }
    case 'personal-info-tel': {
      comStatus.name = 'personal-info-tel';
      comStatus.status.title!.status = '请填写手机号';
      if ('type' in comStatus.status) {
        comStatus.status.type.isShow = false;
      }
      break;
    }
  }
}

// 处理日期
export function formatDate(
  row: SurveyDBData,
  column: TableColumnCtx<SurveyDBData>,
  cellValue: number,
) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return new Intl.DateTimeFormat('zh-CN', options).format(new Date(cellValue));
}

// 还原组件
export function restoreComponentsStatus(coms: Status[]) {
  coms.forEach((com) => {
    //   com.type = shallowRef(componentMap[com.name as componentName]);
    com.type = componentMap[com.name as componentName];
    for (const key in com.status) {
      const name = com.status[key]?.name as EditComName;
      if (com.status[key]) {
        com.status[key].editCom = componentMap[name];
      }
    }
  });
}
