<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        page
        <arrow-down style="width: 1em; height: 1em" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <NuxtLink to="/blog/page1">page1</NuxtLink>
          </el-dropdown-item>
          <el-dropdown-item>
            <NuxtLink to="/blog/page2">page2</NuxtLink>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown-menu a {
  color: #343a40;
  text-decoration: none;
  font-weight: bold;
}

header nav .el-dropdown {
  margin: 0 10px;
  color: #eceff1;
  text-decoration: none;
  font-weight: bold;
}

header nav .el-dropdown {
  font-size: 16px;
  margin-bottom: 5px;
}
</style>
