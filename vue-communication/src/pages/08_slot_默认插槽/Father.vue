<template>
  <div class="father">
    <h3>父组件</h3>
    <div class="content">
      <Category title="热门游戏列表">
        <ul>
          <li v-for="e in games" :key="e.id">{{ e.name }}</li>
        </ul>
      </Category>
      <Category title="今日美食城市">
        <img :src="imgUrl" alt="" srcset="" />
      </Category>
      <Category title="今日影视推荐">
        <video :src="videoUrl" controls></video>
      </Category>
    </div>
  </div>
</template>

<script setup lang="ts" name="Father">
import { reactive, ref } from "vue";
import Category from "./Category.vue";
defineOptions({
  name: "Father",
});

let games = reactive([
  { id: "001", name: "战地风云" },
  { id: "002", name: "生化危机" },
  { id: "002", name: "怪物猎人" },
  { id: "003", name: "英雄联盟" },
]);

let imgUrl = ref("https://z1.ax1x.com/2023/11/19/piNxLo4.jpg");
let videoUrl = ref("http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4");
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
.content {
  display: flex;
  justify-content: space-evenly;
}
img,
video {
  width: 100%;
}

li {
  list-style: none;
}
</style>
