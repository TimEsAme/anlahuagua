<template>
  <div>
    <li>
      <label>
        <input
          type="checkbox"
          :checked="e.done"
          @change="Ultraman.changeUltraman(e.id)"
        />
        <span v-if="!e.edit">{{ e.name }}</span>
        <input
          type="text"
          v-else
          ref="inp"
          v-model="e.name"
          @blur="e.edit = false"
        />
      </label>
      <button class="btn btn-danger" @click="Ultraman.delUltraman(e.id)">
        删除
      </button>
      <button class="btn btn-edit" @click="showInput(e)">编辑</button>
    </li>
  </div>
</template>

<script lang="ts" setup>
import { useUltramanStore } from "@/store/Ultraman";
import { nextTick, ref } from "vue";

defineOptions({
  name: "Item",
});
defineProps(["e"]);

const Ultraman = useUltramanStore();

let inp = ref();

function showInput(e: any) {
  e.edit = true;
  nextTick(() => {
    inp.value.focus();
  });
}
</script>

<style lang="less" scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:hover {
  background-color: gray;
  .btn {
    display: inline-block;
  }
}

.btn {
  display: none;
}

.btn-edit {
  margin-right: 3px;
}
</style>
