<template>
  <div>
    <Layout>
      <router-link
        class="link-item mb-15"
        to="/materials/select-group/single-select"
        exact-active-class="link-item-active"
        >单选题
      </router-link>
      <router-link
        class="link-item mb-15"
        to="/materials/select-group/multiple-select"
        exact-active-class="link-item-active"
        >多选题
      </router-link>
      <router-link
        class="link-item mb-15"
        to="/materials/select-group/option-select"
        exact-active-class="link-item-active"
        >下拉选择
      </router-link>
      <router-link
        class="link-item mb-15"
        to="/materials/select-group/single-pic-select"
        exact-active-class="link-item-active"
        >图片单选题
      </router-link>
      <router-link
        class="link-item mb-15"
        to="/materials/select-group/multi-pic-select"
        exact-active-class="link-item-active"
        >图片多选题
      </router-link>
    </Layout>
  </div>
</template>

<script lang="ts" setup>
import Layout from './Layout.vue';
</script>

<style scoped lang="scss"></style>
