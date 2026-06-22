<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  onUnmounted,
  shallowRef,
  watch,
  watchEffect,
  type PropType,
} from "vue";
import type { EChartsCoreOption } from "echarts";
import type { ECharts } from "echarts";
import * as echarts from "echarts";

// 定义组件 props
const props = defineProps({
  // ECharts 配置项
  option: {
    type: Object as PropType<EChartsCoreOption>,
    required: true,
    default: () => ({}),
  },
  // 加载状态
  loading: Boolean,
});

// DOM 元素引用（使用 shallowRef 避免深度响应式）
const chartRef = shallowRef<HTMLElement | null>(null);
// ECharts 实例引用
const myChart = shallowRef<ECharts | null>(null);

/**
 * 初始化 ECharts 实例
 */
function init() {
  dispose();
  if (props.option) {
    // 创建 ECharts 实例
    myChart.value = echarts.init(chartRef.value);
    // 设置初始配置
    setOption(props.option);
  }
}

/**
 * 设置/更新 ECharts 配置
 * @param option - 图表配置项
 * @param notMerge - 是否不合并，默认 false（合并）
 * @param lazyUpdate - 是否延迟更新，默认 false（立即更新）
 */
function setOption(option: any, notMerge?: boolean, lazyUpdate?: boolean) {
  if (myChart.value) {
    myChart.value.setOption(option, notMerge, lazyUpdate);
  }
}

/**
 * 重置图表大小（通常用于窗口自适应）
 */
function resize() {
  myChart.value?.resize();
}

/**
 * 销毁 ECharts 实例
 */
function dispose() {
  if (myChart.value) {
    myChart.value.dispose();
    myChart.value = null;
  }
}

let observer: ResizeObserver;

// 组件挂载后初始化图表
onMounted(() => {
  // 初始化 ECharts 实例
  init();
  // 监听窗口大小变化，自动调整图表尺寸
  // window.addEventListener("resize", resize);

  // 创建 ResizeObserver
  // 用于监听图表容器尺寸变化
  observer = new ResizeObserver(() => {
    // 通知 ECharts 重新计算尺寸
    myChart.value?.resize();
  });
  // 开始监听图表 DOM 元素
  if (chartRef.value) {
    observer.observe(chartRef.value);
  }
});

// 组件卸载前销毁实例，防止内存泄漏
onUnmounted(() => {
  // window.removeEventListener("resize", resize);

  // 停止监听所有元素
  observer.disconnect();

  // 销毁 ECharts 实例
  dispose();
});

// 监听配置项变化，动态更新图表
watch(
  () => props.option,
  () => {
    setOption(props.option);
  },
  { deep: true }, // 深度监听，确保对象内部属性变化也能触发更新
);

// 监听加载状态变化
watchEffect(() => {
  if (!myChart.value) return;
  props.loading ? myChart.value.showLoading() : myChart.value.hideLoading();
});

// 暴露方法给父组件调用
defineExpose({
  myChart, // ECharts 实例
  setOption, // 手动更新配置的方法
  resize, // 手动调整大小的方法
});
</script>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
