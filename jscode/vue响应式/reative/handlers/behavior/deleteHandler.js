import trigger from "../../effect/trigger.js";
import { TriggerTypes } from "../../utils.js";

export default function (target, key) {
  // 判断一下目标对象上面是否有要删除的属性
  const hasKey = target.hasOwnProperty(key);

  // 进行删除行为
  const res = Reflect.deleteProperty(target, key);

  // 派发更新之前，需要判断一下
  if (hasKey && res) {
    trigger(target, TriggerTypes.DELETE, key);
  }

  return res;
}
