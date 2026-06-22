<template>
  <div class="person">
    <h1>姓名:{{ person.name }}</h1>
    <h1>年龄:{{ person.age }}</h1>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">换人</button>
  </div>
</template>
s

<script lang="ts" setup>
import { reactive, watch } from "vue";

defineOptions({
  name: "Person",
});

let person = reactive({
  name: "张三",
  age: 18,
});

function changeName() {
  person.name += "~";
}
function changeAge() {
  person.age++;
}
function changePerson() {
  Object.assign(person, { name: "李四", age: 20 });
}

// 监视
// 情况三:监视reactive定义的对象类型数据,默认是开启深度监视
// a,b的值一直是一样的
// 以上三个修改都没有真正替换成新对象所以新value和旧value是一样的
watch(person, (a, b) => {
  console.log(a, b);
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
