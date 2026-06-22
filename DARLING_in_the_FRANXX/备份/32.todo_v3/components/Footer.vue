<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ completed }}</span> / 全部{{ all }}
    </span>
    <button class="btn btn-danger" @click="Ultraman.delCompleted">
      清除已完成任务
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useUltramanStore } from "@/store/Ultraman";
import { storeToRefs } from "pinia";
import { computed } from "vue";

defineOptions({
  name: "Footer",
});

const Ultraman = useUltramanStore();
const { all, completed } = storeToRefs(Ultraman);

let isAll = computed({
  get() {
    return all.value && all.value === completed.value;
  },
  set(v) {
    Ultraman.changeAll(v);
  },
});
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
