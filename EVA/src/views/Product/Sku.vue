<template>
  <div class="Sku">
    <h1 class="title">Sku</h1>
    <div class="btn">
      <el-button type="primary" v-permission="['btn.Sku.add']"
        >ADD!!!
      </el-button>
      <el-button type="warning" v-permission="['btn.Sku.remove']"
        >REMOVE!!!
      </el-button>
      <el-button type="danger" v-permission="['btn.Sku.update']"
        >EDIT!!!
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Sku",
});
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
}
.btn {
  width: 100%;
  height: 300px;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
