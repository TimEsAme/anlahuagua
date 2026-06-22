import { TrackTypes, ITERATE_KEY } from "../utils.js";
import { activeEffect, targetMap } from "./effect.js";

// 控制是否需要进行依赖收集的开关
let shouldTrack = true;

/**
 * 暂停依赖收集
 */
export function pauseTrack() {
  shouldTrack = false;
}

/**
 * 恢复依赖收集
 */
export function resumeTrack() {
  shouldTrack = true;
}

/**
 * 收集器：用于收集依赖
 * @param {*} target 原始对象
 * @param {*} type 进行的操作类型
 * @param {*} key 针对哪一个属性
 */
export default function (target, type, key) {
  if (!shouldTrack || !activeEffect) {
    return;
  }

  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }

  if (key === TrackTypes.ITERATE) {
    key = ITERATE_KEY;
  }
  let typeMap = propMap.get(key);
  if (!typeMap) {
    typeMap = new Map();
    propMap.set(key, typeMap);
  }

  let depSet = typeMap.get(type);
  if (!depSet) {
    depSet = new Set();
    typeMap.set(type, depSet);
  }

  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect);
    activeEffect.deps.push(depSet);
  }

  // console.log(targetMap.get(target), "xxxxxxxxxxxx");
}
