<template>
  <div>
    <h1>安拉花瓜!!!</h1>
  </div>
</template>

<script lang="ts" setup>
const dio = {
  name: "张三",
  age: 18,
  hobby: ["抽烟", "喝酒", "烫头"],
  car: {
    brand: "凯迪拉克",
    price: "100w",
  },
};
const jojo = {};
function deepCopy(newObj: any, oldObj: any) {
  for (let k in oldObj) {
    if (oldObj[k] instanceof Array) {
      newObj[k] = [];
      deepCopy(newObj[k], oldObj[k]);
    } else if (oldObj[k] instanceof Object) {
      newObj[k] = {};
      deepCopy(newObj[k], oldObj[k]);
    } else {
      newObj[k] = oldObj[k];
    }
  }
}

deepCopy(jojo, dio);

console.log(jojo);
</script>

<style scoped></style>
