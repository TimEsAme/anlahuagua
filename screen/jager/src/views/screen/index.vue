<template>
  <ScaleScreen>
    <div
      class="screen"
      :class="{
        light: screenStore.theme === 'light',
      }"
    >
      <Header />
      <div class="screen-main">
        <div class="screen-left">
          <!-- <Left1 />
          <Left2 /> -->
          <Left />
        </div>
        <div class="screen-center">
          <Center />
        </div>
        <div class="screen-right">
          <Right />
        </div>
      </div>
    </div>
  </ScaleScreen>

  <!-- <div class="screen-container">
    <div ref="screenRef" class="screen-wrapper">
      <img src="./assets/bg.jpg" />
    </div>
  </div> -->
</template>

<script setup lang="ts">
import Center from "./components/center/index.vue";
import Left from "./components/left/index.vue";
import Right from "./components/right/index.vue";
import ScaleScreen from "@/components/scale-screen/index";
import Header from "./components/Header.vue";
// import { useResize } from "./composables/useResize";
// const { screenRef } = useResize();
// import Left1 from "./components/left/Left1.vue";
// import Left2 from "./components/left/Left2.vue";

import { useScreenStore } from "@/store/modules/screen";
const screenStore = useScreenStore();
</script>

<style lang="scss" scoped>
.screen {
  --ds-screen-width: 1920px;
  --ds-screen-height: 1080px;
  --ds-header-height: 72px;
  --ds-block-bg: #222733;
  --ds-screen-bg: rgb(22, 21, 24);
  --ds-screen-text-color: #fff;
  position: absolute;
  padding: 0 20px;
  background: var(--ds-screen-bg);
  color: var(--ds-screen-text-color);
  &-main {
    position: relative;
    display: flex;
    height: calc(100% - var(--ds-header-height));
  }
  &-center {
    flex: 1;
    width: calc(var(--ds-screen-width) - 1000px);
  }
  &-left,
  &-right {
    width: 460px;
  }
}

// .screen-container {
//   width: 100vw;
//   height: 100vh;
//   overflow: hidden;
//   background-color: tomato;
//   background-size: 100% 100%;
// }
// .screen-wrapper {
//   width: 1920px;
//   height: 1080px;
//   overflow: hidden;
//   position: relative;
//   transform-origin: 0 0;
//   transition-property: all;
//   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//   transition-duration: 0.3s;
// }

.light {
  --ds-screen-bg: rgb(238, 238, 238);
  --ds-block-bg: #fff;
  --ds-screen-text-color: rgb(22, 21, 34);
}
</style>
