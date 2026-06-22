<template>
  <div>
    <div class="msg" @click="goHome">
      <h1>见过TM404吗?你个傻屌,<br />滚出去</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.msg {
  width: 700px;
  height: 500px;
  background-color: tomato;
  margin: 100px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
h1 {
  font-size: 100px;
}
</style>
