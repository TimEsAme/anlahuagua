import { effect } from "./effect/effect.js";
import track from "./effect/track.js";
import trigger from "./effect/trigger.js";
import { TrackTypes, TriggerTypes } from "./utils.js";


// 参数归一化
function normalizeParameter(getterOrOptions) {
  let getter, setter;
  if (typeof getterOrOptions === "function") {
    getter = getterOrOptions;
    setter = () => {
      console.warn(`Computed property was assigned to but it has no setter.`);
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return { getter, setter };
}

export function computed(getterOrOptions) {
  const { getter, setter } = normalizeParameter(getterOrOptions);

  // 储存计算属性的结果
  let value;
  // 表示计算属性是否是脏值,如果为true就需要重新计算

  let dirty = true;
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true;
      trigger(obj, TriggerTypes.SET, "value");
    },
  });

  console.log("安拉花瓜");
  const obj = {
    get value() {
      track(obj, TrackTypes.GET, "value");
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      return value;
    },
    set value(newValue) {
      setter(newValue);
    },
  };
  return obj;
}
