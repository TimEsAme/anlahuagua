<template>
  <div>
    <Header />
    <slot></slot>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "./footer.vue";
import Header from "./header.vue";
</script>

<style scoped></style>
