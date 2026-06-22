import trigger from "../../effect/trigger.js";
import { TriggerTypes, hasChange } from "../../utils.js";

export default function (target, key, value) {
  // 关于具体的操作类型需要进一步判断 是设置，还是新增
  const type = target.hasOwnProperty(key) ? TriggerTypes.SET : TriggerTypes.ADD;

  // 在设置之前需要缓存一下旧值
  const oldVal = target[key];
  // 缓存旧的数组长度
  const oldLength = Array.isArray(target) ? target.length : undefined;

  // 设置操作
  const res = Reflect.set(target, key, value);

  // 要不要派发更新需要一些判断
  if (hasChange(oldVal, value)) {
    // 派发更新
    trigger(target, type, key);

    // 需要判断 length 是否有变化，如果有变化，需要对 length 进行派发更新
    if (Array.isArray(target) && oldLength !== target.length) {
      // 之所以这里要判断一下，是因为 length 显式的改变是会触发派发更新
      if (key !== "length") {
        // 进入这个 if，说明 length 发生了隐式的变化
        trigger(target, TriggerTypes.SET, "length");
      } else {
        // 进入此 else，说明 length 发生了显式的变化
        // 我们需要处理新的长度小于旧的长度的情况，因为这里涉及到了删除操作
        for (let i = target.length; i < oldLength; i++) {
          trigger(target, TriggerTypes.DELETE, i.toString());
        }
      }
    }
  }

  return res;
}
