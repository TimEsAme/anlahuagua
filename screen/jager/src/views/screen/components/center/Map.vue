<template>
  <div class="screen-block">
    <Title>商家分布</Title>
    <div style="width: 100%; height: 90%">
      <v-chart :option="option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Title from "../Title.vue";
import * as echarts from "echarts";
// import mapJson from "@/assets/data/china.json";
import mapJson from "@/assets/data/chinaJSON.json";
import mapData from "@/assets/data/map.json";
const option = ref({});
// 注册地图数据
echarts.registerMap("china", mapJson as any);
const setOption = () => {
  option.value = {
    geo: {
      type: "map",
      map: "china",
      // 开启缩放和平移
      roam: true,
      // 缩放大小
      // scaleLimit: {
      //   min: 1,
      //   max: 8,
      // },
      // zoom: 1.2, // 默认缩放倍数

      top: "5%",
      bottom: "5%",
      layoutCenter: ["50%", "50%"],
      layoutSize: "98%",
      itemStyle: {
        areaColor: "#2c3e50",
        borderColor: "#111",
      },

      label: {
        show: true, // 显示省名
        color: "#fff", // 文字颜色
        fontSize: 12, // 字号
        fontWeight: "bold",
        offset: [0, 0], // 偏移量
        formatter: (params: any) => {
          return params.name
            .replace(/特别行政区/g, "")
            .replace(/维吾尔自治区/g, "")
            .replace(/壮族自治区/g, "")
            .replace(/回族自治区/g, "")
            .replace(/自治区/g, "")
            .replace(/省/g, "")
            .replace(/市/g, "");
        },
      },
    },
    legend: {
      left: "5%",
      bottom: "5%",
      orient: "vertical",
      data: mapData.map((item) => item.name),
      textStyle: {
        color: "#aaa",
      },
    },
    series: mapData.map((item) => {
      return {
        type: "effectScatter",
        rippleEffect: {
          scale: 5,
          brushType: "stroke",
        },
        name: item.name,
        data: item.children,
        coordinateSystem: "geo",
      };
    }),
  };
};

onMounted(() => {
  setOption();
});
</script>

<style lang="scss" scoped>
.screen-block {
  width: 100%;
  height: calc(100% - 50px); /* 总高度减去 Title 的高度 */
}

/* 确保父容器有明确的高度 */
:deep(.v-chart-container) {
  width: 100%;
  height: 100%;
}
</style>
