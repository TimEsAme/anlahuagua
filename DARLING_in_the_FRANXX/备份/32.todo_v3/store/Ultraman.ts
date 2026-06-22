import { defineStore } from "pinia";

export const useUltramanStore = defineStore("Ultraman", {
  state() {
    return {
      UltramanList:
        JSON.parse(localStorage.getItem("Ultraman") as string) || [],
    };
  },
  actions: {
    changeUltraman(id: string) {
      this.UltramanList.forEach((e: any) => {
        if (e.id === id) {
          e.done = !e.done;
        }
      });
    },

    delUltraman(id: string) {
      if (!confirm("确定删除嘛?")) return;
      let arr = this.UltramanList.filter((e: any) => {
        return e.id != id;
      });
      this.UltramanList = arr;
    },

    changeAll(v: boolean) {
      this.UltramanList.forEach((e: any) => {
        e.done = v;
      });
    },

    delCompleted() {
      const hasCompleted = this.UltramanList.some((e: any) => e.done);
      if (!hasCompleted) return alert("没有已完成项");

      if (!confirm("确定删除嘛?")) return;
      this.UltramanList = this.UltramanList.filter((e: any) => !e.done);
    },

  },

  getters: {
    all: (state) => state.UltramanList.length,
    completed: (state) => state.UltramanList.filter((e: any) => e.done).length,
  },
  persist: true,
});
