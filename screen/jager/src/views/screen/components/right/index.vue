<template>
  <component
    v-for="item in components"
    :key="item.name"
    :is="item.component"
    class="screen-right-item"
    :name="item.name"
  ></component>
</template>

<script lang="ts" setup>
import { shallowRef } from "vue";
import Right1 from "./Right1.vue";
import Right2 from "./Right2.vue";
import Right3 from "./Right3.vue";

const components = shallowRef([
  {
    name: "Right1",
    component: Right1,
  },
  {
    name: "Right2",
    component: Right2,
  },
  {
    name: "Right3",
    component: Right3,
  },
]);
</script>

<style scoped lang="scss">
.screen-right-item {
  width: 100%;
  height: 320px;
  padding: 16px;
  background-color: var(--ds-block-bg);
  animation-name: slide;
  & + & {
    margin-top: 20px;
  }
  &[name="Right1"] {
    animation-duration: 0.5s;
  }

  &[name="Right2"] {
    animation-duration: 0.8s;
  }

  &[name="Right3"] {
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
