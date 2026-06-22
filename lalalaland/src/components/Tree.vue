<template>
  <div class="tree-node" v-for="(e, i) in data" :key="e.label">
    <div class="node-label">
      <button
        class="toggle-button"
        v-if="hasChildren(e)"
        @click="isOpenArr[i] = !isOpenArr[i]"
      >
        {{ isOpenArr[i] ? "▼" : "▶" }}
      </button>
      <input
        type="checkbox"
        v-if="showCheckbox"
        v-model="e.checked"
        @change="jojoChange(e)"
      />
      <label>{{ e.label }}</label>
    </div>

    <div v-if="transition">
      <Transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div v-if="hasChildren(e)" v-show="isOpenArr[i]">
          <Tree
            :data="e.children"
            :showCheckbox="showCheckbox"
            :transition="transition"
            @jojo="emit('jojo', $event)"
          />
        </div>
      </Transition>
    </div>
    <div v-else>
      <div v-if="hasChildren(e)" v-show="isOpenArr[i]">
        <Tree
          :data="e.children"
          :showCheckbox="showCheckbox"
          :transition="transition"
          @jojo="emit('jojo', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { inject, provide, ref } from "vue";
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  showCheckbox: {
    type: Boolean,
    default: true,
  },
  transition: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["jojo"]);
// 每一层通过状态控制面板折叠还是展开
// 有多少层就有多少个状态
const isOpenArr = ref(props.data.map(() => true));
// 判断是否有子节点
const hasChildren = (node) => {
  return node.children && node.children.length > 0;
};

// 复选框处理函数
function jojoChange(node) {
  // 更新子节点
  const updateChild = (node, checked) => {
    node.checked = checked;
    if (hasChildren(node)) {
      node.children.forEach((e) => {
        updateChild(e, checked);
      });
    }
  };
  updateChild(node, node.checked);

  // 更新父节点
  const updateParentCheck = (node) => {
    const parent = node.parent;
    if (!parent) return;
    const allChildrenChecked = parent.children.every((child) => child.checked);
    if (parent.checked !== allChildrenChecked) {
      parent.checked = allChildrenChecked;
    }
    updateParentCheck(parent);
  };
  updateParentCheck(node);

  //   触发用户自定义事件
  emit("jojo", node);
}

// 过渡动画相关的方法
function beforeEnter(el) {
  el.style.maxHeight = "0";
  el.style.opacity = "0";
  el.style.overflow = "hidden";
}

function enter(el) {
  el.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
  el.style.maxHeight = el.scrollHeight + "px";
  el.style.opacity = "1";
}

function afterEnter(el) {
  el.style.maxHeight = "none";
}

function beforeLeave(el) {
  el.style.maxHeight = el.scrollHeight + "px";
  el.style.opacity = "1";
  el.style.overflow = "hidden";
}

function leave(el) {
  el.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
  el.style.maxHeight = "0";
  el.style.opacity = "0";
}

function afterLeave(el) {
  el.style.maxHeight = "none";
}
</script>

<style scoped lang="scss">
.tree-node {
  margin-left: 20px;
  font-family: Arial, sans-serif;
}
.node-label {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.toggle-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  color: black;
}
</style>
