import { defineStore } from "pinia";

export const useJojoStore = defineStore("jojo", {
  state() {
    return {
      sum: 10086,
    };
  },
  actions: {
    add() {
      this.sum++;
    },
  },
});
