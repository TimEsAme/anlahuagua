<template>
  <div class="person">
    <h1>姓名:{{ name }}</h1>
    <h1>年龄:{{ age }}</h1>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
    <hr />
    <h1>{{ a }}</h1>
    <h1>{{ c }}</h1>
    <button @click="d">测试</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Person",
  data() {
    return {
      a: 1,
      b: 2,
      c: this.name,
    };
  },
  methods: {
    d() {
      console.log("d");
    },
  },
  setup() {
    // setup中this是undefined,并且setup函数会最先执行

    // 这么定义数据不是响应式
    let name = "张三";
    let age = 18;
    let tel = "13888888888";

    function showTel() {
      alert(tel);
    }
    function changeName() {
      name = "神鹰哥";
    }
    function changeAge() {
      age += 1;
    }

    return { name, age, tel, showTel, changeName, changeAge };
  },

  // v2 v3可以共存 setup访问不到v2的数据   v2访问得到v3里的数据
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
