import track from "../../effect/track.js";
import { TrackTypes } from "../../utils.js";

export default function (target, key) {
  // 需要进行依赖的收集
  track(target, TrackTypes.HAS, key);
  const res = Reflect.has(target, key);
  return res;
}
