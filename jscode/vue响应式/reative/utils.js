/**
 * 收集器的操作类型
 */
export const TrackTypes = {
  GET: "get",
  HAS: "has",
  ITERATE: "iterate",
};

/**
 * 触发器的操作类型
 */
export const TriggerTypes = {
  SET: "set",
  ADD: "add",
  DELETE: "delete",
};

/**
 * 判断是否是对象
 * @param {*} target 要判断的值
 * @returns
 */
export function isObj(val) {
  return typeof val === "object" && val !== null;
}

/**
 * 判断值是否改变
 * @param {*} oldValue
 * @param {*} newValue
 * @returns
 */
export function hasChange(oldVal, newVal) {
  // 使用该方法可以规避一些特殊的情况
  // NaN === NaN 在 JS 中是 false，Object.is 返回的是 true
  // +0 === -0 在 JS 中是 true，Object.is 返回的是 false
  return !Object.is(oldVal, newVal);
}

/**
 * 这是一个特殊标识
 */
export const RAW = Symbol("raw");

export const ITERATE_KEY = Symbol("iterate");
