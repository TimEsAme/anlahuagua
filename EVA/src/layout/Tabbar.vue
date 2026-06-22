<template>
  <div class="tabbar">
    <Tabbar_left />
    <Tabbar_right />
  </div>
</template>

<script lang="ts" setup>
import Tabbar_left from "./Tabbar_left.vue";
import Tabbar_right from "./Tabbar_right.vue";
defineOptions({
  name: "Tabbar",
});
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
