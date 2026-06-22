import singleSelectDefaultStatus from './SingleSelect';
import multipleSelectDefaultStatus from './multiSelect';
import optionSelectDefaultStatus from './OptionSelect';
import singlePicSelectDefaultStatus from './SinglePicSelect';
import multiPicSelect from './multiPicSelect';
import textNote from './TextNote';
import textInput from './TextInput';
import rateScore from './RateScore';
import dateTime from './DateTime';

export const defaultStatusMap = {
  // 选择-单选
  'single-select': singleSelectDefaultStatus,
  // 选择-多选
  'multiple-select': multipleSelectDefaultStatus,
  // 下拉选择题
  'option-select': optionSelectDefaultStatus,
  // 选择-图片单选
  'single-pic-select': singlePicSelectDefaultStatus,
  // 选择-图片多选
  'multi-pic-select': multiPicSelect,

  // 备注说明
  'text-note': textNote,

  // 文本输入
  'text-input': textInput,

  // 评价打分
  'rate-score': rateScore,
  'date-time': dateTime,

  // 个人信息
  'personal-info-gender': singleSelectDefaultStatus,
  'personal-info-education': singleSelectDefaultStatus,

  'personal-info-tel': textInput,
};
