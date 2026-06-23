<template>
  <!-- 
    BPMN 编辑器容器
    bpmn-js 会把流程图渲染到这个 div 中
  -->
  <div class="jojo">
    <!-- 按钮组 -->
    <div class="button-group">
      <button class="toolbar-btn" @click="handleNew">新建</button>

      <!-- 导入文件 -->
      <label class="upload-btn">
        <span>导入 XML</span>

        <!-- 选择本地 BPMN/XML 文件 -->
        <input
          type="file"
          accept=".xml .bpmn"
          class="upload-input"
          @change="handleImport"
        />
      </label>

      <!-- 导出 XML -->
      <button class="toolbar-btn" @click="handleExportXML">导出 XML</button>

      <!-- 导出 SVG -->
      <button class="toolbar-btn" @click="handleExportSVG">导出 SVG</button>
    </div>

    <!-- 内容区 -->
    <div class="container">
      <div ref="cavansDom" class="canvas">
        <el-dialog
          v-model="bpmnStore.nodeVisible"
          title="Tips"
          width="500"
          :before-close="handleClose"
        >
          <div>{{ bpmnStore.nodeInfo.id }}</div>
          <div>{{ bpmnStore.nodeInfo.type }}</div>
          <template #footer>
            <div class="dialog-footer">
              <el-button type="primary" @click="handleClose"> 关闭 </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
      <!-- 属性面板 -->
      <!-- <div id="js-properties-panel" class="panel"></div> -->
      <!-- 自定义属性面板 -->
      <properties-view v-if="modeler" :modeler="modeler!" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
// 默认 BPMN XML 数据
import { xmlStr } from "@/mock/xmlStr";
// BPMN 编辑器核心
import BpmnModeler from "bpmn-js/lib/Modeler";
// 画布类型
import type Canvas from "diagram-js/lib/core/Canvas";
// BPMN 基础样式
import "bpmn-js/dist/assets/bpmn-js.css";
// diagram-js 样式
import "bpmn-js/dist/assets/diagram-js.css";
// BPMN 图标样式
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
// 属性面板模块
// import {
//   BpmnPropertiesPanelModule,
//   BpmnPropertiesProviderModule,
// } from "bpmn-js-properties-panel";
// 汉化模块
// import customTranslateModule from "@/additional-modules/Translate";
// 属性面板样式
import "@bpmn-io/properties-panel/assets/properties-panel.css";
// 自定义属性面板组件
import PropertiesView from "./customPropertiesPanel/PropertiesView.vue";

import type ElementRegistry from "diagram-js/lib/core/ElementRegistry";
import type EventBus from "diagram-js/lib/core/EventBus";

import CustomModeler from "./customModeler";

import { useBpmnStore } from "@/store/bpmn";

const bpmnStore = useBpmnStore();

const handleClose = () => {
  bpmnStore.toggleNodeVisible(false);
};

// BPMN 挂载容器
const cavansDom = ref<HTMLElement | null>(null);

// BPMN 实例
const modeler = ref<BpmnModeler | null>(null);

// 新建流程图
async function handleNew() {
  // 空白 BPMN XML
  const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false"/>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"/>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
  // 加载 XML
  await loadXml(emptyXml);
  // 自动缩放到可视区域
  const canvans = modeler.value?.get<Canvas>("canvas");
  canvans?.zoom("fit-viewport");
}

// 导出 XML
async function handleExportXML() {
  if (!modeler) return;
  // 获取 XML 数据
  const { xml } = await modeler.value!.saveXML({
    format: true,
  });
  // 下载 XML 文件
  download("jojo.xml", xml as string, "application/xml");
}

// 导出 SVG
async function handleExportSVG() {
  if (!modeler) return;
  // 获取 SVG 数据
  const { svg } = await modeler.value!.saveSVG();
  // 下载 SVG 文件
  download("jojo.svg", svg, "image/svg+xml");
}

// 导入本地 BPMN/XML 文件
async function handleImport(e: Event) {
  const input = e.target as HTMLInputElement;
  // 获取用户选择的文件
  const file = input.files?.[0];
  if (!file) return;
  // 读取文件内容
  const text = await file.text();
  // 加载 XML
  await loadXml(text);
  // 自动缩放
  const canvas = modeler.value!.get<Canvas>("canvas");
  canvas.zoom("fit-viewport");
  // 清空 input
  input.value = "";
}
// 下载辅助函数
function download(filename: string, data: string, mime: string) {
  // 创建 Blob 对象
  const blob = new Blob([data], {
    type: mime,
  });
  // 生成临时 URL
  const url = URL.createObjectURL(blob);
  // 创建 a 标签
  const a = document.createElement("a");
  // 设置下载地址
  a.href = url;
  // 设置文件名
  a.download = filename;
  // 触发下载
  a.click();
  // 释放 URL
  URL.revokeObjectURL(url);
}

// 加载 BPMN XML
async function loadXml(xml: string) {
  if (!modeler) return;
  try {
    // 导入 XML
    await modeler.value!.importXML(xml);
  } catch (err) {
    console.error("无法导入 BPMN 2.0 XML", err);
  }
}

onMounted(async () => {
  if (!cavansDom.value) return;

  modeler.value = new CustomModeler({
    container: cavansDom.value,
  });
  // 加载默认 XML
  await loadXml(xmlStr);
  // 自动缩放
  const canvans = modeler.value!.get<Canvas>("canvas");
  canvans.zoom("fit-viewport");

  // 监听事件
  // modelerListener();
  eventBusListener();
});

onBeforeUnmount(() => {
  // 销毁实例
  modeler.value?.destroy();
  // 清空引用
  modeler.value = null;
});

// 给 bpmn-js modeler 注册事件监听。
// 添加节点
// 删除节点
// 移动节点
// 结束时，会打印事件对象。
function modelerListener() {
  if (!modeler) return;
  const event = ["shape.added", "shape.removed", "element.move.end"];
  event.forEach((event) => {
    modeler.value?.on(event, function (e: any) {
      const elementRegistry =
        modeler.value?.get<ElementRegistry>("elementRegistry");
      const shape = e.element ? elementRegistry?.get(e.element.id) : e.element;
      // console.log(shape);
      if (event === "element.move.end") {
        console.log("元素移动结束", shape);
      } else if (event === "shape.added") {
        console.log("元素添加", shape);
      } else if (event === "shape.removed") {
        console.log("元素删除", shape);
      }
    });
  });
}
// 监听 bpmn-js 的全局事件总线（EventBus）
// 点击元素
// 元素变化
// 时，获取当前元素并打印。
function eventBusListener() {
  if (!modeler) return;
  const m = modeler.value;
  const eventBus = modeler.value!.get<EventBus>("eventBus");
  const eventTypes = ["element.click", "element.changed"];
  eventTypes.forEach((eventType) => {
    eventBus.on(eventType, async function (e: any) {
      if (!e || e.element.type === "bpmn:Process") return;
      // const elementRegistry = modeler?.get<ElementRegistry>("elementRegistry");
      // const shape = e.element ? elementRegistry?.get(e.element.id) : e.element;
      // console.log(shape);
      if (eventType === "element.changed") {
        console.log("元素属性被修改了");
        const { xml } = await m!.saveXML({ format: true });
        console.log(xml); // 修改后的最新xml
      }
    });
  });
}
</script>

<style scoped lang="scss">
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

.jojo {
  display: flex;
  flex-direction: column;
  // background-color: firebrick;
}

.container {
  padding: 20px;
  width: 100%;
  height: calc(100vh);
  // background-color: tomato;
}

.canvas {
  position: relative;
  width: 100%;
  height: 600px;
  border: 2px solid #000;
  // background-color: orange;
}

.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 350px;
}

/* 按钮组 */
.button-group {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
}

/* 通用按钮样式 */
.toolbar-btn,
.upload-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

/* hover 效果 */
.toolbar-btn:hover,
.upload-btn:hover {
  background-color: #656565;
}

/* 隐藏文件选择框 */
.upload-input {
  display: none;
}
</style>
