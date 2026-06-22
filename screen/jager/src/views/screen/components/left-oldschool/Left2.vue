<template>
  <div class="screen-block">
    <Title>地区销量趋势</Title>
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

const data = [
  {
    name: "上海",
    data: [
      "155.13",
      "154.65",
      "171.46",
      "164.38",
      "237.23",
      "300.65",
      "240.29",
      "232.07",
      "193.31",
      "136.70",
      "48.64",
      "90.20",
    ],
  },
  {
    name: "北京",
    data: [
      "86.25",
      "33.80",
      "145.58",
      "21.79",
      "176.09",
      "132.41",
      "291.05",
      "191.89",
      "151.54",
      "94.25",
      "141.75",
      "157.14",
    ],
  },
  {
    name: "深圳",
    data: [
      "143.94",
      "186.29",
      "183.64",
      "251.48",
      "195.48",
      "152.16",
      "52.47",
      "184.12",
      "203.79",
      "39.16",
      "56.37",
      "161.64",
    ],
  },
  {
    name: "广州",
    data: [
      "57.60",
      "77.61",
      "307.24",
      "165.05",
      "175.41",
      "276.88",
      "269.04",
      "296.11",
      "105.31",
      "283.39",
      "134.08",
      "265.38",
    ],
  },
  {
    name: "重庆",
    data: [
      "200.82",
      "215.56",
      "249.80",
      "222.67",
      "216.98",
      "60.12",
      "309.68",
      "273.35",
      "150.99",
      "251.97",
      "26.15",
      "186.99",
    ],
  },
];

const renderChart = () => {
  const option: EChartsCoreOption = {
    // 位置
    grid: {
      top: "10%",
      bottom: "5%",
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
      data: data.map((e) => e.name),
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
    series: getSeries(),
  };
  myChart.value!.setOption(option);
};

function getSeries() {
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
  const seriesArr = data.map((item, index) => {
    return {
      name: item.name,
      type: "line",
      data: item.data,
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
