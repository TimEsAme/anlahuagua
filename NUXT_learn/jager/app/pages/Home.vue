<template>
  <div>
    <h1>Home</h1>
    <ElButton :icon="EditPen" type="primary" circle />
    <ElButton :icon="EditPen" type="success" circle />
    <ElButton :icon="EditPen" type="warning" circle />
    <ElButton :icon="EditPen" type="default" circle />
    <ElButton :icon="EditPen" type="danger" circle />
    <nuxt-link to="/">BACK</nuxt-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
