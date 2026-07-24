<template>
  <div>
    <h1 class="page-header">使用说明</h1>
    <p>通过此系统熟悉 Nuxt 的使用</p>
    <p>联系方式</p>
    <NuxtLink
      to="/about"
      class="navigation"
      exact-active-class="my-exact-active"
      >邮箱</NuxtLink
    >
    <NuxtLink
      to="/about/tel"
      class="navigation"
      exact-active-class="my-exact-active"
      >电话
    </NuxtLink>
    <NuxtPage />
  </div>
</template>
