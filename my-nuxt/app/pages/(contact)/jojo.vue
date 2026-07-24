<template>
  <div>
    <div class="jojo">
      <h1>{{ count }}</h1>
      <button @click="add">+1</button>
      <ClientOnly>
        <h1>{{ randomNumber(1, 100) }}</h1>
      </ClientOnly>
      <h1>{{ capitalize("ash") }}</h1>
    </div>
    <div>
      <Mikasa v-if="show" />
      <button @click="show = !show">显示子组件</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const show = ref(false);

const count = useState("count", () => 0);
const add = debounce(() => {
  count.value++;
}, 500);

onErrorCaptured((err, instance, info) => {
  console.log("onErrorCaptured错误对象", err);
  console.log("onErrorCaptured组件实例", instance);
  console.log("onErrorCaptured信息来源", info);

  // 加上这个就是停在这一层不再向上冒泡
  // return false;
});
</script>

<style scoped>
.jojo {
  width: 100%;
  height: 200px;
  background-color: tomato;
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10px;
}
</style>
