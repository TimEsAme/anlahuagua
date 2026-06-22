<template>
  <div>
    <Title class="title">销售统计表</Title>
    <div class="chart-div">
      <v-chart :option="option" :loading="loading"></v-chart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Title from "../Title.vue";

import { useAsync } from "@/composables/useAsync";
import { getHotsList } from "@/api/modules/hots";
import type { Hots } from "@/api/interface";

const option = ref({});

const { data, loading, error, execute } = useAsync(getHotsList, {
  onSuccess: (res) => {
    // console.log("热销数据加载成功:", res);
    if (res.code === 200) {
      setOption(res.data!);
    }
  },
  onError: (err) => {
    console.error("加载失败!!!", err);
  },
});

const setOption = (state: Hots[]) => {
  option.value = {
    grid: {
      containLabel: false,
    },
    legend: {
      bottom: "0%",
      icon: "circle",
      data: state[0].children!.map((item) => {
        return item.name;
      }),
      textStyle: {
        color: "#aaa",
      },
    },
    tooltip: {
      show: true,
      formatter: (arg: any) => {
        const thirdCategory = arg.data.children;
        // 计算出所有三级分类的数值总和
        let total = 0;
        thirdCategory.forEach((item: any) => {
          total += item.value;
        });
        let retStr = "";
        thirdCategory.forEach((item: any) => {
          retStr += `
            ${item.name}:${Math.floor((item.value / total) * 100) + "%"}
            <br/>
          `;
        });
        return retStr;
      },
    },
    series: [
      {
        type: "pie",
        radius: 80, // 固定像素半径
        label: {
          show: false,
        },
        data: state[0].children!.map((item) => {
          return {
            name: item.name,
            value: item.value,
            children: item.children, // 新增加children的原因是为了在tooltip中的formatter的回调函数中,来拿到这个二级分类下的三级分类数据
          };
        }),
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
