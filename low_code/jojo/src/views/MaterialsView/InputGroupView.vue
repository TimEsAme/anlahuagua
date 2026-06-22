<template>
  <div>
    <Layout>
      <router-link
        class="link-item mb-15"
        exact-active-class="link-item-active"
        to="/materials/input-group/text-input"
        >文本输入
      </router-link>
    </Layout>
  </div>
</template>

<script lang="ts" setup>
import Layout from './Layout.vue';
</script>

<style scoped lang="scss"></style>
