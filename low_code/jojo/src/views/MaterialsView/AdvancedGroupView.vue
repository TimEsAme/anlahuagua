<template>
  <div>
    <Layout>
      <router-link
        class="link-item mb-15"
        exact-active-class="link-item-active"
        to="/materials/advanced-group/rate-score"
        >评价打分
      </router-link>
      <router-link
        class="link-item mb-15"
        exact-active-class="link-item-active"
        to="/materials/advanced-group/date-time"
        >日期时间
      </router-link>
    </Layout>
  </div>
</template>

<script lang="ts" setup>
import Layout from './Layout.vue';
</script>

<style scoped lang="scss"></style>
