<template>
  <div class="not-found">
    <p>这是一个全匹配页面</p>
    <p>
      当页面无法明确被匹配的时候，会自动进入全匹配路由组件，当然导航的路由为：
    </p>
    <p>路由数组：{{ path }}</p>
    <p>完整的路由字符串：{{ route.fullPath }}</p>
    <p>
      <NuxtLink to="/">返回到首页</NuxtLink>
    </p>
  </div>
</template>

<script setup>
const route = useRoute();
const path = route.params.xxx;
console.log(path);
</script>

<style scoped>
.not-found {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffe4e1;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 28px;
  color: #d9534f;
}

p {
  margin: 20px 0;
  font-size: 18px;
  color: #555;
}

code {
  display: inline-block;
  margin: 10px 0;
  padding: 8px 12px;
  background-color: #f4f4f4;
  color: #444;
  border-radius: 4px;
  font-size: 16px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
