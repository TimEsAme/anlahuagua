<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from "vue";
import useSettingStore from "@/store/modules/setting";
defineOptions({
  name: "Main",
});
const settingStore = useSettingStore();
let flag = ref(true);

watch(
  () => settingStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => (flag.value = true));
  },
);
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale3d(0);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale3d(1);
}
</style>
