<template>
  <div id="app">
    <!-- 各种传值 -->
    <!-- <Xxx :a="name" :changeA="changeA" /> -->
    <!-- <Xxx v-model:jojo="name" /> -->
    <!-- <Xxx :a="name" @changeA="changeA" /> -->

    <!-- 自定义指令控制权限按钮显示 -->
    <Permission />

    <!-- 全局错误处理插件 -->
    <!-- <button @click="boom">安拉花瓜!!!</button>
    <ErrorLogger /> -->

    <!-- pinia插件 -->
    <!-- <h1>{{ jojojoStore.sum }}</h1>
    <button @click="jojojoStore.add()">+++</button> -->

    <!-- 树组件 -->
    <!-- <h1>格鲁特</h1>
    <Tree
      :data="data"
      :showCheckbox="true"
      :transition="true"
      @jojo="changeEvent"
    /> -->

    <!-- ref防抖 -->
    <!-- <input type="text" v-model="text" />
    <h1>{{ text }}</h1> -->

    <!-- 图片懒加载 -->
    <!-- <Lazy /> -->

    <!-- 定高虚拟列表 -->
    <!-- <VirtualList :dataList="dataList" :itemSize="100" /> -->

    <!-- 动态高度 -->
    <!-- <VirtualList_1
      :dataList="dataList"
      :itemSize="100"
      :estimatedItemSize="100"
    /> -->
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { customRef, ref } from "vue";

// 各种传值
// import Xxx from "./components/Xxx.vue";
// let name = ref("张三");
// const changeA = (n) => {
//   name.value = n;
// };

// 自定义指令设置按钮权限
import Permission from "./components/Permission.vue";

// 全局错误处理插件
// function boom() {
//   throw new Error("安拉花瓜!!!");
// }

// pinia
// import { useJojoStore } from "./store/jojo.ts";
// const jojojoStore = useJojoStore();

// 树形组件
// import Tree from "./components/Tree.vue";
// import treeData from "./mock/tree.ts";
// const data = ref<any[]>(treeData);
// // 处理数据,树组件要知道自己的父组件是谁
// const initParent = (data, parent = null) => {
//   data.forEach((e) => {
//     e.parent = parent;
//     if (e.children) {
//       initParent(e.children, e);
//     }
//   });
// };
// initParent(data.value);

// const changeEvent = (data) => {
//   console.log(data);
// };

// 防抖ref
// function debounceRef(value, delay = 1000) {
//   let timer = null;
//   let _value = value;
//   return customRef((track, trigger) => {
//     return {
//       get() {
//         track();
//         return _value;
//       },
//       set(val) {
//         // 防抖
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//           _value = val;
//           trigger();
//         }, delay);
//       },
//     };
//   });
// }
// const text = debounceRef("安拉花瓜", 1000);

// 懒加载
// import Lazy from "./components/Lazy.vue";

// 定高虚拟列表
// import VirtualList from "./components/VirtualList.vue";
// let d = [];
// for (let i = 0; i < 10000; i++) {
//   d.push({
//     id: i,
//     value: `第${i + 1}条数据`,
//   });
// }
// const dataList = ref(d);

// 动态虚拟列表
// import VirtualList_1 from "./components/VirtualList_1.vue";
// import { faker } from "@faker-js/faker";
// let d = [];
// for (let i = 0; i < 10000; i++) {
//   d.push({
//     id: i,
//     // 生成一个随机的句子
//     value: faker.lorem.sentences(),
//   });
// }
// const dataList = ref(d);
</script>

<style>
/* p {
  font-size: 18px;
  color: #333;
} */

/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 300px;
} */

html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
}
</style>
