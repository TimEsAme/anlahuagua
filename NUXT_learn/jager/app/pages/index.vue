<template>
  <div class="container">
    <!-- 上面部分：搜索框和新增按钮 -->
    <div class="top">
      <el-input class="searchBox" v-model="searchItem" placeholder="搜索" />
      <el-button type="primary" size="small" @click="addEvent">
        <el-icon><plus /></el-icon>
        <el-icon><user-filled /></el-icon>
      </el-button>
    </div>

    <!-- 下面部分：用户列表 -->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center" />
      <el-table-column prop="age" label="年龄" width="180" align="center" />
      <el-table-column prop="phone" label="联系方式" align="center" />
      <el-table-column prop="" label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="goToDetail(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores";
const userStore = useUserStore();
const router = useRouter();

await userStore.fetchUser();

const { getUserList: userList } = storeToRefs(userStore);

// 搜索框的值
const searchItem = ref("");

// 看搜索框是否有值，如果有值说明是在搜索，那么显示搜索后的列表
const list = computed(() => {
  const keyword = searchItem.value.trim();
  if (!keyword) return userList.value;
  return userList.value.filter((item) => item.name.includes(keyword));
});

const goToDetail = (row) => {
  router.push(`/detail/${row.id}`);
};

const addEvent = () => {
  router.push("/edit");
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
  font-weight: 200;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}
.searchBox {
  width: 400px;
}

/* 添加必要的样式调整 */
.el-header {
  background-color: #333;
  color: white;
  line-height: 60px;
}
.el-menu-demo {
  background-color: transparent;
}

.pagination {
  margin: 30px auto;
  display: flex;
  justify-content: center;
}
</style>
