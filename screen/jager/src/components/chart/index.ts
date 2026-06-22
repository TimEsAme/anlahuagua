/**
 * ECharts 按需引入配置文件
 * 只引入项目中实际使用的模块，减小打包体积
 */

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";

// ==================== 引入图表类型 ====================
// 引入柱状图图表，图表后缀都为 Chart
// 如果后续需要其他图表类型（折线图、饼图等），在这里添加
import { BarChart } from "echarts/charts";

// ==================== 引入组件 ====================
// 标题、提示框、直角坐标系、数据集、内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent, // 标题组件
  TooltipComponent, // 提示框组件（鼠标悬浮显示数据详情）
  GridComponent, // 直角坐标系网格组件
  DatasetComponent, // 数据集组件（支持直接传入数据集）
  TransformComponent, // 数据转换器组件（支持数据过滤、排序等）
} from "echarts/components";

// ==================== 引入特性 ====================
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";

// ==================== 引入渲染器 ====================
// 引入 Canvas 渲染器（必须引入 CanvasRenderer 或 SVGRenderer）
// Canvas 渲染器适合大数据量场景，性能更好
import { CanvasRenderer } from "echarts/renderers";

// 导入封装好的图表 Vue 组件
import Chart from "./Chart.vue";
import type { App } from "vue";

/**
 * Vue 插件安装方法
 * 在 main.ts 中使用 app.use() 注册
 *
 * @example
 * // main.ts
 * import EChartsPlugin from './plugins/echarts'
 * app.use(EChartsPlugin)
 */
export const install = (app: App) => {
  // 全局注册 v-chart 组件，可在任何地方使用 <v-chart /> 标签
  app.component("v-chart", Chart);
};

// 注册必须的组件和图表
// 只有注册过的模块才会被打包，未注册的不会包含在最终产物中
echarts.use([
  // 组件
  TitleComponent, // 图表标题
  TooltipComponent, // 数据提示框
  GridComponent, // 网格坐标系
  DatasetComponent, // 数据集管理
  TransformComponent, // 数据转换

  // 图表类型
  BarChart, // 柱状图/条形图

  // 特性
  LabelLayout, // 标签自动布局
  UniversalTransition, // 全局过渡动画

  // 渲染器
  CanvasRenderer, // Canvas 渲染方式
]);

// 导出默认插件对象
export default {
  install,
};
