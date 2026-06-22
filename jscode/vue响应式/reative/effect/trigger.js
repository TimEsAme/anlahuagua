import { TriggerTypes, ITERATE_KEY, TrackTypes } from "../utils.js";
import { activeEffect, targetMap } from "./effect.js";

const triggerTypeMap = {
  [TriggerTypes.SET]: [TrackTypes.GET],
  [TriggerTypes.ADD]: [TrackTypes.GET, TrackTypes.ITERATE, TrackTypes.HAS],
  [TriggerTypes.DELETE]: [TrackTypes.GET, TrackTypes.ITERATE, TrackTypes.HAS],
};
/**
 * 触发器
 * @param {*} target 原始对象
 * @param {*} type 操作的类型
 * @param {*} key 操作的属性
 */

export default function (target, type, key) {
  const effectFns = getEffectFns(target, type, key);
  if (!effectFns) return;

  for (const effectFn of effectFns) {
    if (effectFn === activeEffect) continue;
    if (effectFn.options && effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  }
}

function getEffectFns(target, type, key) {
  const propMap = targetMap.get(target);
  if (!propMap) return;

  const keys = [key];
  if (type === TriggerTypes.ADD || TriggerTypes.DELETE) {
    keys.push(ITERATE_KEY);
  }

  const effectFns = new Set();

  for (const key of keys) {
    const typeMap = propMap.get(key);
    if (!typeMap) continue;

    const trackTypes = triggerTypeMap[type];
    for (const trackType of trackTypes) {
      const dep = typeMap.get(trackType);
      if (!dep) continue;
      for (const effectFn of dep) {
        effectFns.add(effectFn);
      }
    }
  }
  return effectFns;
}
