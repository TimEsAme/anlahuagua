<template>
  <div class="person">
    <ul>
      <li v-for="e in personList" :key="e.id">{{ e.name }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import type { Persons } from "@/types";

defineOptions({
  name: "Person",
});

// 可以使用变量接收
// let x = defineProps(["personList"]);
// console.log(x);

// // 使用defineProps接收
// defineProps(["personList"]);

// // 使用defineProps接收并且限制类型
// defineProps<{ personList: Persons }>();

// 使用defineProps接收并且限制类型、限制必要性、指定默认值

const { personList = [{ id: "000", name: "王麻子", age: 18 }] } = defineProps<{
  personList?: Persons;
}>();
</script>

<style scoped>
.person {
  background-color: teal;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 10px;
}
li {
  list-style: none;
}
</style>
