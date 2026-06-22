<template>
  <div class="screen-block">
    <Title>销售统计表</Title>
    <div ref="chartRef" style="width: 100%; height: 90%"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import * as echarts from "echarts";
import type { ECharts } from "echarts";
import type { EChartsCoreOption } from "echarts";
import Title from "../Title.vue";

const chartRef = shallowRef<HTMLElement | null>(null);
const myChart = shallowRef<ECharts | null>(null);

onMounted(() => {
  myChart.value = echarts.init(chartRef.value);
  renderChart();
});

const renderChart = () => {
  const option: EChartsCoreOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        z: 0,
        lineStyle: {
          color: "#2d3443",
        },
      },
    },
    legend: {
      top: 0,
      right: 0,
      data: [
        {
          name: "销售额",
          icon: "circle",
          textStyle: {
            color: "#fff",
          },
        },
      ],
    },
    //x轴
    xAxis: {
      splitLine: { show: false }, // 是否显示网格线
      axisLine: { show: true }, // 是否显示轴线
      type: "value", // 作为数据展示
      // max: function (value: any) {
      //   return parseInt(value.max * 1.2 + "");
      // },
    },
    //y轴
    yAxis: {
      type: "category",
      data: ["商家1", "商家2", "商家3", "商家4", "商家5", "商家6"],
      inverse: true, // y轴反向
      axisLine: { show: true }, // 是否显示轴线
      axisTick: { show: false }, // 是否显示刻度
      axisLabel: {
        color: "#fff",
      },
    },
    grid: {
      top: "10%",
      bottom: "5%",
      right: "0",
      left: "0",
      containLabel: true,
    },
    series: [
      {
        type: "bar",
        label: {
          show: true,
          position: "right",
        },
        name: "销售额",
        data: [5, 20, 36, 10, 10, 20],
        barWidth: 22,
        roundCap: true,
        showBackground: true,
        backgroundStyle: {
          color: "rgba(220, 220, 220, 0.3)",
        },
        itemStyle: {
          borderWidth: 0,
          borderRadius: [0, 10, 10, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#00fffb",
            },
            {
              offset: 1,
              color: "#0061ce",
            },
          ]),
        },
      },
    ],
  };
  myChart.value!.setOption(option);
};
</script>

<style scoped>
.screen-block {
  width: 100%;
  height: 460px;
  padding: 16px;
  background-color: var(--ds-block-bg);
  margin-top: 20px;
}
</style>
