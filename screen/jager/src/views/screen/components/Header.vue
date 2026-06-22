<template>
  <div class="screen-header">
    <div class="screen-header-left">
      <h2>安拉花瓜</h2>
    </div>
    <div class="screen-header-center">{{ screenStore.title }}</div>
    <div class="screen-header-right">
      <div class="jojo">
        <img
          class="theme-change"
          :src="theme"
          :class="{
            dark: screenStore.theme === 'light',
          }"
          @click="handleChangeTheme"
        />
        <span class="datetime">{{ currentTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed, onBeforeUnmount, ref } from "vue";
import switch_dark from "@/assets/img/switch_dark.png";
import switch_light from "@/assets/img/switch_light.png";
import { useScreenStore } from "@/store/modules/screen";
const screenStore = useScreenStore();

const theme = computed(() =>
  screenStore.theme === "dark" ? switch_light : switch_dark,
);

const currentTime = ref("");
const timeId = ref();
function startTime() {
  timeId.value = setTimeout(() => {
    currentTime.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
    startTime();
  }, 1000);
}
startTime();
onBeforeUnmount(() => {
  clearTimeout(timeId.value);
});

const handleChangeTheme = () => {
  screenStore.changeTheme();
};
</script>

<style lang="scss" scoped>
.screen-header {
  position: relative;
  width: 100%;
  height: var(--ds-header-height);
  background: url("../../../assets/img/header.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  .screen-header-left,
  .screen-header-right {
    flex: 1; // 左右各占1份，等宽
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .screen-header-center {
    width: 490px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .screen-header-right {
    display: flex;
    justify-content: flex-end;
    .jojo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: 20px;
      .theme-change {
        width: 30px;
        margin-right: 10px;
      }
    }
  }
}
</style>
