<template>
  <div class="news">
    <ul>
      <li v-for="e in newsList" :key="e.id">
        <!-- <router-link :to="`/news/detail/${e.id}/${e.title}/${e.content}`">
          {{ e.title }}
        </router-link> -->
        <!-- params传参只能用name跳转 -->
        <router-link
          :to="{
            name: 'detail',
            params: {
              id: e.id,
              title: e.title,
              content: e.content,
            },
          }"
        >
          {{ e.title }}
        </router-link>
      </li>
    </ul>
    <div class="news-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts" name="News">
import { reactive } from "vue";

const newsList = reactive([
  { id: "001", title: "战地风云", content: "安拉花瓜!!!" },
  { id: "002", title: "使命召唤", content: "同志起来!!!" },
  { id: "003", title: "生化危机", content: "柜子动了!!!" },
  { id: "004", title: "人中之龙", content: "背锅之龙!!!" },
]);
</script>

<style scoped>
/* 新闻 */
.news {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.news ul {
  margin-top: 30px;
  list-style: none;
  padding-left: 10px;
}
.news li > a {
  font-size: 18px;
  line-height: 40px;
  text-decoration: none;
  color: #64967e;
  text-shadow: 0 0 1px rgb(0, 84, 0);
}
.news-content {
  width: 70%;
  height: 90%;
  border: 1px solid;
  margin-top: 20px;
  border-radius: 10px;
}
</style>
