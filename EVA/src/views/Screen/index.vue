<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <div class="top"></div>
      <div class="bottom">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
let screenRef = ref();

onMounted(() => {
  screenRef.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});

window.onresize = () => {
  screenRef.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w;
  const hh = window.innerHeight / h;
  return ww < hh ? ww : hh;
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url("./images/bg.png") no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    background-color: tomato;
    left: 50%;
    top: 50%;
    transform-origin: left top;
  }
}
</style>
