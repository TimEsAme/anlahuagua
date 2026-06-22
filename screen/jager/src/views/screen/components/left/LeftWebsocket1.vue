<template>
  <div class="screen-block">
    <Title>销售统计表</Title>
    <div ref="chartRef" class="chart-div"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import * as echarts from "echarts";
import type { ECharts } from "echarts";
import type { EChartsCoreOption } from "echarts";
import Title from "../Title.vue";
import { io, Socket } from "socket.io-client";

const chartRef = shallowRef<HTMLElement | null>(null);
const myChart = shallowRef<ECharts | null>(null);

// Socket.IO相关内容
const socket = ref<Socket | null>(null);
const connectionStatus = ref<"connected" | "disconnected">("disconnected");

const initSocket = () => {
  socket.value = io("http://localhost:3000", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  // 连接事件
  socket.value.on("connect", () => {
    connectionStatus.value = "connected";
    console.log("Socket.IO 已经连接");
  });

  // 断开连接事件
  socket.value.on("disconnect", () => {
    connectionStatus.value = "disconnected";
    console.log("Socket.IO 已经断开连接");
  });

  // 接受数据
  socket.value.on("salesData", handleData);
};

const handleData = (newData: Array<{ name: string; value: number }>) => {
  if (!myChart.value) return;
  const categories = newData.map((item) => item.name);
  const values = newData.map((item) => item.value);
  myChart.value.setOption({
    yAxis: {
      data: categories,
    },
    series: [
      {
        data: values,
      },
    ],
  });
};

const renderChart = () => {
  myChart.value = echarts.init(chartRef.value);
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
      // },
    },
    //y轴
    yAxis: {
      type: "category",
      data: [],
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
      right: "8%",
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
        data: [],
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

onMounted(() => {
  initSocket();
  renderChart();
});
</script>

<style scoped>
.screen-block {
  width: 100%;
  height: 460px;
  padding: 16px;
  background-color: tomato;
  margin-top: 20px;
}

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
