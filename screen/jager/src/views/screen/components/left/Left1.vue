<template>
  <div>
    <Title class="title">销售统计表</Title>
    <div class="chart-div">
      <v-chart :option="option" :loading="loading"></v-chart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Title from "../Title.vue";
import * as echarts from "echarts";
import { getSalesList } from "@/api/modules/sales";
import type { Sales } from "@/api/interface";
import { useAsync } from "@/composables/useAsync";

const option = ref({});
// const state = ref<Sales[]>([]);

const { data, loading, error, execute } = useAsync(getSalesList, {
  onSuccess: (res) => {
    setOption(res.data!);
  },
  onError: (err) => {
    console.error("加载失败!!!", err);
  },
});

// onMounted(() => {
//   getData();
// });
// const getData = async () => {
//   const res = await getSalesList();
//   if (res.code === 200) {
//     state.value = res.data!;
//     setOption();
//   }
// };

const setOption = (state: Sales[]) => {
  option.value = {
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
            color: "#aaa",
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
      data: state.map((e) => e.name),
      inverse: true, // y轴反向
      axisLine: { show: true }, // 是否显示轴线
      axisTick: { show: false }, // 是否显示刻度
      axisLabel: {
        color: "#fff",
      },
    },
    grid: {
      top: "5%",
      bottom: "0",
      right: "30px",
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
        data: state.map((e) => e.value),
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
};
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
