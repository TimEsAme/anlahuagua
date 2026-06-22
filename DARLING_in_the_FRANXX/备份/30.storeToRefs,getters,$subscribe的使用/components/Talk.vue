<template>
  <div class="talk">
    <button @click="talkStore.getTalk">获取</button>
    <ul>
      <li v-for="e in list" :key="e.id">{{ e.title }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useTalkStore } from "@/store/talk";
import { storeToRefs } from "pinia";

defineOptions({
  name: "Talk",
});

const talkStore = useTalkStore();
const { list } = storeToRefs(talkStore);

talkStore.$subscribe((mutate, state) => {
  console.log(1111, mutate, state);
  localStorage.setItem("list", JSON.stringify(state.list));
});
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
