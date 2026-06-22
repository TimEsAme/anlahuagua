<template>
  <div class="talk">
    <button @click="getLoveTalk">获取</button>
    <ul>
      <li v-for="e in talkStore.list" :key="e.id">{{ e.title }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { nanoid } from "nanoid";
import { useTalkStore } from "@/store/talk";

defineOptions({
  name: "Talk",
});

const talkStore = useTalkStore();

async function getLoveTalk() {
  //   let res = await axios.get("https://v1.hitokoto.cn/");
  //   const { hitokoto, from, from_who } = res.data;
  //   const title = `${hitokoto}——${from_who ? from_who + " · " : ""}${from}`;
  //   let obj = {
  //     id: nanoid(),
  //     title,
  //   };
  //   list.unshift(obj);
}
</script>

<style scoped>
.talk {
  background-color: aquamarine;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
li {
  list-style: none;
}
</style>
