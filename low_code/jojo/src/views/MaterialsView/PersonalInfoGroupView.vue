<template>
  <div>
    <Layout>
      <!-- <router-link
        class="link-item mb-15"
        to=""
        >姓名
      </router-link>
      <router-link
        class="link-item mb-15"
        to=""
        >出生日期
      </router-link>
      <router-link
        class="link-item mb-15"
        to=""
        >年龄
      </router-link>
      <router-link
        class="link-item mb-15"
        to=""
        >大学
      </router-link>
      <router-link
        class="link-item mb-15"
        to=""
        >行业
      </router-link>
      <router-link
        class="link-item mb-15"
        to=""
        >公司
      </router-link>
      <router-link
        class="link-item mb-15"
        to=""
        >身份证物
      </router-link> -->
      <router-link
        class="link-item mb-15"
        exact-active-class="link-item-active"
        to="/materials/personal-info-group/personal-info-gender"
        >性别
      </router-link>
      <router-link
        class="link-item mb-15"
        exact-active-class="link-item-active"
        to="/materials/personal-info-group/personal-info-education"
        >学历
      </router-link>
      <!-- <router-link
        class="link-item mb-15"
        to=""
        >专业
      </router-link>
      <router-link
        class="link-item mb-15"
        to=""
        >职业
      </router-link>
      <router-link
        class="link-item mb-15"
        to=""
        >职位
      </router-link> -->
    </Layout>
  </div>
</template>

<script lang="ts" setup>
import Layout from './Layout.vue';
</script>

<style scoped lang="scss"></style>
