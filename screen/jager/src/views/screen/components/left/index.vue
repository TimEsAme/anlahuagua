<template>
  <component
    v-for="item in components"
    :key="item.name"
    :is="item.component"
    class="screen-left-item"
    :name="item.name"
  ></component>
</template>

<script lang="ts" setup>
import { shallowRef } from "vue";
// import Left1 from "./Left1.vue";
import LeftWebsocket1 from "./LeftWebsocket1.vue";
// import Left2 from "./Left2.vue";
import LeftWebsocket2 from "./LeftWebsocket2.vue";
("./Left2.vue");

const components = shallowRef([
  {
    name: "LeftWebsocket1",
    component: LeftWebsocket1,
  },
  // {
  //   name: "left1",
  //   component: Left1,
  // },
  // {
  //   name: "left2",
  //   component: Left2,
  // },
  {
    name: "LeftWebsocket2",
    component: LeftWebsocket2,
  },
]);
</script>

<style scoped lang="scss">
.screen-left-item {
  width: 100%;
  height: 460px;
  padding: 16px;
  background-color: var(--ds-block-bg);
  animation-name: slide;
  & + & {
    margin-top: 20px;
  }

  &[name="left1"] {
    animation-duration: 0.8s;
  }
  &[name="LeftWebsocket1"] {
    animation-duration: 0.8s;
  }

  &[name="left2"] {
    animation-duration: 1s;
  }
  &[name="LeftWebsocket2"] {
    animation-duration: 1s;
  }

  @keyframes slide {
    0% {
      transform: translateX(-100%);
    }
    80% {
      transform: translateX(20px);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
