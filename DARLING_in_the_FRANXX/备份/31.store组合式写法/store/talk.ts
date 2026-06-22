import { defineStore } from "pinia";
import axios from "axios";
import { nanoid } from "nanoid";
import { reactive } from "vue";

interface TalkItem {
  id: string;
  title: string;
}

// export const useTalkStore = defineStore("talk", {
//   state() {
//     return {
//       list: JSON.parse(localStorage.getItem("list") as string) || [],
//     };
//   },
//   actions: {
//     async getTalk() {
//       let res = await axios.get("https://v1.hitokoto.cn/");
//       const { hitokoto, from, from_who } = res.data;
//       const title = `${hitokoto}——${from_who ? from_who + " · " : ""}${from}`;
//       let obj = {
//         id: nanoid(),
//         title,
//       };
//       this.list.unshift(obj);
//     },
//   },
// });

export const useTalkStore = defineStore("talk", () => {
  const list = reactive(
    JSON.parse(localStorage.getItem("list") as string) || [],
  );

  async function getTalk() {
    let res = await axios.get("https://v1.hitokoto.cn/");
    const { hitokoto, from, from_who } = res.data;
    const title = `${hitokoto}——${from_who ? from_who + " · " : ""}${from}`;
    let obj = {
      id: nanoid(),
      title,
    };
    list.unshift(obj);
  }

  return { list, getTalk };
});
