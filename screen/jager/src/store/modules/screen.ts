import { defineStore } from "pinia";

export const useScreenStore = defineStore("screen", {
  state() {
    return {
      title: "安拉花瓜可视化",
      theme: "dark",
    };
  },
  actions: {
    changeTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
    },
  },
});
