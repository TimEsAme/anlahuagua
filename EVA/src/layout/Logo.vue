<template>
  <div class="logo" v-if="setting.logoShow">
    <img
      class="img"
      :src="setting.logo"
      :class="{ img_fold: fold ? true : false }"
    />
    <Transition name="fade">
      <p v-if="!fold">{{ setting.title }}</p>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import setting from "@/setting";
defineOptions({
  name: "Logo",
});
defineProps(["fold"]);
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 20px;
  .img {
    width: 100px;
    margin-right: 10px;
    transition: all 0.3s ease;

    &.img_fold {
      width: 60px;
      margin-right: 0;
    }
  }
  p {
    font-size: 30px;
    font-weight: 600;
    color: #fff;
  }
}

// 文字过渡动画
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
