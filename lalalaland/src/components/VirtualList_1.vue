<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollHandler">
    <!-- 占位高度，形成滚动条 -->
    <div class="infinite-list-phantom" ref="listHeight"></div>
    <!-- 可视区域 -->
    <div ref="content" class="infinite-list">
      <div
        ref="items"
        class="infinite-list-item"
        v-for="e in visibleData"
        :key="e.id"
      >
        {{ e.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { computed, nextTick, onMounted, onUpdated, ref, watch } from "vue";

const props = defineProps({
  dataList: { type: Array, default: () => [] },
  estimatedItemSize: { type: Number, required: true }, // 预估高度
  bufferScale: { type: Number, default: 1 }, // 缓冲比例
});

const list = ref(null);
const content = ref(null);
const items = ref([]);
const listHeight = ref(null);
const screenHeight = ref(0);

const startIndex = ref(0);
const endIndex = ref(0);

// 缓存每条数据高度和位置
let positions = [];

const init = () => {
  positions = props.dataList.map((_, i) => ({
    index: i,
    height: props.estimatedItemSize,
    top: i * props.estimatedItemSize,
    bottom: (i + 1) * props.estimatedItemSize,
  }));
};

// 可视区显示数量
const visibleCount = computed(() =>
  Math.ceil(screenHeight.value / props.estimatedItemSize),
);

const aboveCount = computed(() =>
  Math.min(startIndex.value, props.bufferScale * visibleCount.value),
);
const belowCount = computed(() =>
  Math.min(
    props.dataList.length - endIndex.value,
    props.bufferScale * visibleCount.value,
  ),
);

// 当前显示的数据
const visibleData = computed(() => {
  const start = Math.max(0, startIndex.value - aboveCount.value);
  const end = Math.min(
    endIndex.value + belowCount.value,
    props.dataList.length,
  );
  return props.dataList.slice(start, end);
});

// 二分查找获取当前 startIndex
const getStartIndex = (scrollTop) => {
  let left = 0,
    right = positions.length - 1,
    result = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (positions[mid].bottom > scrollTop) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return result;
};

// 滚动处理函数
const scrollHandler = () => {
  if (!list.value) return;
  const scrollTop = list.value.scrollTop;
  // console.log(scrollTop);

  const newStartIndex = getStartIndex(scrollTop);
  if (newStartIndex !== startIndex.value) {
    startIndex.value = newStartIndex;
    endIndex.value = Math.min(
      startIndex.value + visibleCount.value,
      props.dataList.length,
    );
    setStartOffset();
  }
};

// 更新每条可视项高度
const updateItemsSize = () => {
  if (!items.value?.length) return;
  let needUpdate = false;
  const startIdx = Math.max(0, startIndex.value - aboveCount.value);

  items.value.forEach((node, idx) => {
    if (!node) return;
    const realIndex = startIdx + idx;
    if (realIndex >= positions.length) return;

    const height = node.getBoundingClientRect().height;
    const diff = positions[realIndex].height - height;
    if (diff !== 0) {
      needUpdate = true;
      positions[realIndex].height = height;
      positions[realIndex].bottom -= diff;
      for (let i = realIndex + 1; i < positions.length; i++) {
        positions[i].top = positions[i - 1].bottom;
        positions[i].bottom = positions[i].top + positions[i].height;
      }
    }
  });

  return needUpdate;
};

// 设置内容容器偏移
const setStartOffset = () => {
  if (!content.value) return;
  const startOffset =
    positions[Math.max(0, startIndex.value - aboveCount.value)]?.top || 0;
  content.value.style.transform = `translate3d(0,${startOffset}px,0)`;
};

// 初始化
onMounted(() => {
  screenHeight.value = list.value.clientHeight;
  startIndex.value = 0;
  endIndex.value = Math.min(
    startIndex.value + visibleCount.value,
    props.dataList.length,
  );
  init();
  if (listHeight.value && positions.length) {
    listHeight.value.style.height =
      positions[positions.length - 1].bottom + "px";
  }
  setStartOffset();
});

// 更新 DOM 后测量高度
onUpdated(() => {
  nextTick(() => {
    if (!items.value?.length) return;
    const needUpdate = updateItemsSize();
    if (needUpdate && listHeight.value && positions.length) {
      listHeight.value.style.height =
        positions[positions.length - 1].bottom + "px";
      setStartOffset();
    }
  });
});

// 当 dataList 改变时重新初始化
watch(
  () => props.dataList,
  () => {
    init();
    startIndex.value = 0;
    endIndex.value = Math.min(
      startIndex.value + visibleCount.value,
      props.dataList.length,
    );
    nextTick(() => {
      if (listHeight.value && positions.length) {
        listHeight.value.style.height =
          positions[positions.length - 1].bottom + "px";
      }
      setStartOffset();
    });
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}
.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}
.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
