<template>
  <div class="person"></div>
</template>
<script lang="ts" setup>
defineOptions({
  name: "Person",
});
</script>

<style scoped>
.person {
  background-color: cadetblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 10px;
}
</style>
