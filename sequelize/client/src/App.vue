<template>
  <div>
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style scoped></style>
