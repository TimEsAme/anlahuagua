<template>
  <div>
    <Title title="地区销量趋势"></Title>
    <div class="chart-div">
      <v-chart :option="option"></v-chart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import Title from "../Title.vue";
import useWebSocket from "@/composables/useWebSocket";
import type { EChartsOption } from "echarts/types/src/export/option.js";

const { subscribe, emit } = useWebSocket("http://localhost:3000", {
  autoConnect: true,
});

const option = ref<EChartsOption>({});
const initOption = () => {
  option.value = {
    // 位置
    grid: {
      top: "15%",
      bottom: "0",
      right: "0",
      left: "0",
      containLabel: true,
    },
    // 移入显示
    tooltip: {
      trigger: "axis",
    },
    legend: {
      top: 0,
      right: 0,
      icon: "circle",
      data: [],
      textStyle: {
        color: "#aaa",
      },
    },
    //x轴
    xAxis: {
      type: "category",
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      boundaryGap: false,
    },
    //y轴
    yAxis: {
      type: "value",
    },
    series: [],
  };
};
function getSeries(
  state: Array<{ _id: number; name: string; value: number[] }>,
) {
  // 半透明的颜色值
  const colorArr1 = [
    "rgba(11, 168, 44, 0.5)",
    "rgba(44, 110, 255, 0.5)",
    "rgba(22, 242, 217, 0.5)",
    "rgba(254, 33, 30, 0.5)",
    "rgba(250, 105, 0, 0.5)",
  ];
  // 全透明的颜色值
  const colorArr2 = [
    "rgba(11, 168, 44, 0)",
    "rgba(44, 110, 255, 0)",
    "rgba(22, 242, 217, 0)",
    "rgba(254, 33, 30, 0)",
    "rgba(250, 105, 0, 0)",
  ];
  const seriesArr = state.map((item, index) => {
    return {
      name: item.name,
      type: "line" as const,
      data: item.value,
      lineStyle: {
        width: 3,
      },
      itemStyle: {
        borderWidth: 4,
      },
      symbol: "circle",
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: colorArr1[index],
          },
          {
            offset: 1,
            color: colorArr2[index],
          },
        ]),
      },
    };
  });
  return seriesArr;
}

onMounted(() => {
  initOption();
});
const updateData = (
  data: Array<{ _id: number; name: string; value: number[] }>,
) => {
  const arr = getSeries(data);
  const nameArr = data.map((e) => e.name);
  option.value = {
    ...option.value, // 可选：保留原配置
    legend: {
      ...option.value.legend,
      data: nameArr,
    },
    series: arr,
  };
};
subscribe("TrendsData", updateData);
</script>

<style scoped>
.chart-div {
  width: 100%;
  height: calc(100% - 50px); /* 总高度减去 Title 的高度 */
}

/* 确保父容器有明确的高度 */
:deep(.v-chart-container) {
  width: 100%;
  height: 100%;
}
</style>
