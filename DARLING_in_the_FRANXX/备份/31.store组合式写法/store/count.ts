import { defineStore } from "pinia";

export const useCountStore = defineStore("count", {
  // 放数据
  state() {
    return {
      sum: 10086,
      map: "哈根塔尔",
      conutry: "德国",
    };
  },
  //   放方法
  actions: {
    mikasa(value: number) {
      // console.log("mikasa", value);
      // this是当前的store
      // if (this.sum <= 10) {
      //   this.sum += value;
      // }
      this.sum += value;
    },
  },
  getters: {
    bigSum: (state) => state.sum * 10,
    jojoSum(): number {
      return this.sum * 9;
    },
  },
});
