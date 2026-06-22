<template>
  <ul class="news-list">
    <li>编号:{{ query.id }}</li>
    <li>标题:{{ query.title }}</li>
    <li>内容:{{ query.content }}</li>
  </ul>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useRoute } from "vue-router";

defineOptions({
  name: "Detail",
});

let route = useRoute();
// 直接写会丢失响应式,要加上toRefs
// let { query } = route;
let { query } = toRefs(route);
</script>

<style scoped>
.news-list {
  list-style: none;
  padding-left: 20px;
}

.news-list > li {
  line-height: 30px;
}
</style>
