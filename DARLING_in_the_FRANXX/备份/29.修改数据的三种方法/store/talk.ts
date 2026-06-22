import { defineStore } from "pinia";

interface TalkItem {
  id: string;
  title: string;
}

export const useTalkStore = defineStore("talk", {
  state() {
    return {
      list: [] as TalkItem[],
    };
  },
});
