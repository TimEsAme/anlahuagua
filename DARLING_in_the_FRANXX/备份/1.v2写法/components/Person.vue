<template>
  <div class="person">
    <h1>姓名:{{ name }}</h1>
    <h1>年龄:{{ age }}</h1>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Person",
  data() {
    return {
      name: "张三",
      age: 18,
      tel: "13888888888",
    };
  },
  methods: {
    showTel() {
      alert(this.tel);
    },
    changeName() {
      this.name = "神鹰哥";
    },
    changeAge() {
      this.age += 1;
    },
  },
};
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
