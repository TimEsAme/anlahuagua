import { defineStore } from "pinia";

export const useCountStore = defineStore("count", {
  // 放数据
  state() {
    return {
      sum: 10086,
      sum1: 100,
      sum2: 888,
    };
  },
  //   放方法
  actions: {
    mikasa(value: any) {
      console.log("mikasa", value);
      this.sum += value;
    },
  },
});
