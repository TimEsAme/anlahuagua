<template>
  <div>
    <Title>库存和销量分析</Title>
    <div class="chart-div">
      <v-chart :option="option" :loading="loading"></v-chart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Title from "../Title.vue";
import * as echarts from "echarts";
import { useAsync } from "@/composables/useAsync";
import { getStockList } from "@/api/modules/stock";
import type { Stock } from "@/api/interface";

const option = ref({});
const { data, loading, error, execute } = useAsync(getStockList, {
  onSuccess: (data) => {
    // console.log("库存数据加载成功:", data);
    if (data.code === 200) {
      setOption(data.data!);
    }
  },
  onError: (err) => {
    console.error("库存数据加载失败:", err);
  },
});

const setOption = (state: Stock[]) => {
  option.value = {
    series: getSeries(state),
  };
};

function getSeries(state: Stock[]) {
  const centerArr = [
    ["18%", "40%"],
    ["50%", "40%"],
    ["82%", "40%"],
    ["34%", "75%"],
    ["66%", "75%"],
  ];
  const colorArr = [
    ["#4FF778", "#0BA82C"],
    ["#E5DD45", "#E8B11C"],
    ["#E8821C", "#E55445"],
    ["#5052EE", "#AB6EE5"],
    ["#23E5E5", "#2E72BF"],
  ];

  const titleFontSize = (460 / 100) * 3.6;
  const innerRadius = titleFontSize * 2.8;
  const outerRadius = innerRadius * 1.125;

  return state.map((item, index) => {
    return {
      type: "pie",
      center: centerArr[index],
      radius: [outerRadius, innerRadius],
      emphasis: {
        scale: false,
      },
      labelLine: {
        show: false, // 隐藏指示线
      },
      data: [
        {
          name: item.name + "\n\n" + item.sales,
          value: item.sales,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: colorArr[index][0],
              },
              {
                offset: 1,
                color: colorArr[index][1],
              },
            ]),
          },
          label: {
            position: "center",
            color: colorArr[index][0],
            fontSize: titleFontSize / 2,
          },
        },
        {
          value: item.stock,
          itemStyle: {
            color: "#333843",
          },
        },
      ],
    };
  });
}
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
