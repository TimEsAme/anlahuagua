<template>
  <!-- 
    BPMN 编辑器容器
    bpmn-js 会把流程图渲染到这个 div 中
  -->
  <div ref="modelerDom" class="modelerDiv"></div>
</template>

<script lang="ts" setup>
/**
 * Vue 生命周期
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * BPMN 的 xml 数据
 * xmlStr 是一份流程图定义文件
 */
import { xmlStr } from "@/mock/xmlStr";

/**
 * BPMN 建模器
 *
 * Modeler:
 * 可编辑流程图
 * 支持：
 * - 拖拽节点
 * - 创建连线
 * - 修改流程
 * - 删除元素
 * 等建模操作
 */
import BpmnModeler from "bpmn-js/lib/Modeler";

/**
 * 画布类型
 * 用于控制缩放、移动等操作
 */
import type Canvas from "diagram-js/lib/core/Canvas";

/**
 * 引入 bpmn-js 相关样式
 */
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";

/**
 * BPMN 挂载容器
 */
const modelerDom = ref<HTMLElement | null>(null);

/**
 * BPMN Modeler 实例
 */
let modeler: BpmnModeler | null = null;

/**
 * 组件挂载完成后执行
 */
onMounted(() => {
  // 防止 DOM 不存在
  if (!modelerDom.value) return;

  /**
   * 创建 BPMN Modeler 实例
   */
  modeler = new BpmnModeler({
    // 指定挂载容器
    container: modelerDom.value,
  });

  /**
   * 导入 BPMN xml 数据
   * 会自动解析并渲染流程图
   */
  modeler.importXML(xmlStr);

  /**
   * 获取画布实例
   */
  const canvans = modeler.get<Canvas>("canvas");

  /**
   * 自动缩放到适应容器
   *
   * fit-viewport:
   * 让整个流程图完整显示
   */
  canvans.zoom("fit-viewport");
});

/**
 * 组件销毁前
 */
onBeforeUnmount(() => {
  /**
   * 销毁 modeler 实例
   * 防止内存泄漏
   */
  modeler?.destroy();

  /**
   * 清空引用
   */
  modeler = null;
});
</script>

<style scoped lang="scss">
/**
 * BPMN 容器样式
 */
.modelerDiv {
  width: 100%;

  /* 画布高度 */
  height: 600px;

  border: 1px solid tomato;
}
</style>
