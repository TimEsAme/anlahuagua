<template>
  <!-- 
    BPMN 预览容器
    bpmn-js 会把流程图渲染到这个 div 中
  -->
  <div ref="viewerDom" class="viewerDiv"></div>
</template>

<script lang="ts" setup>
/**
 * Vue 生命周期
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * BPMN 的 xml 数据
 * xmlStr 就是一份流程图定义
 */
import { xmlStr } from "@/mock/xmlStr";

/**
 * BPMN 查看器
 *
 * Viewer:
 * 只能查看流程图
 * 不能编辑节点、拖拽、修改连线等
 */
import BpmnViewer from "bpmn-js/lib/Viewer";

/**
 * 画布类型
 * 用于控制缩放、移动等操作
 */
import type Canvas from "diagram-js/lib/core/Canvas";

/**
 * BPMN 挂载容器
 */
const viewerDom = ref<HTMLElement | null>(null);

/**
 * BPMN Viewer 实例
 */
let viewer: BpmnViewer | null = null;

/**
 * 组件挂载完成后执行
 */
onMounted(() => {
  // 防止 DOM 不存在
  if (!viewerDom.value) return;

  /**
   * 创建 BPMN Viewer 实例
   */
  viewer = new BpmnViewer({
    // 指定挂载容器
    container: viewerDom.value,
  });

  /**
   * 导入 BPMN xml 数据
   * 会自动解析并渲染流程图
   */
  viewer.importXML(xmlStr);

  /**
   * 获取画布实例
   */
  const canvans = viewer.get<Canvas>("canvas");

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
   * 销毁 viewer 实例
   * 防止内存泄漏
   */
  viewer?.destroy();

  /**
   * 清空引用
   */
  viewer = null;
});
</script>

<style scoped lang="scss">
/**
 * BPMN 容器样式
 */
.viewerDiv {
  width: 100%;

  /* 画布高度 */
  height: 600px;

  border: 1px solid tomato;
}
</style>
