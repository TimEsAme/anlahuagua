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
      <div ref="cavansDom" class="canvas"></div>
      <!-- 属性面板 -->
      <div id="js-properties-panel" class="panel"></div>
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
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule,
} from "bpmn-js-properties-panel";
// 属性面板样式
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "@bpmn-io/properties-panel/dist/assets/properties-panel.css";

// 汉化模块
import customTranslateModule from "@/additional-modules/Translate";
//
import CamundaBpmnModdle from "camunda-bpmn-moddle/resources/camunda.json";
import SelfDescriptor from "./SelfDescriptor.json";

// 类型
import type ElementRegistry from "diagram-js/lib/core/ElementRegistry";
import type EventBus from "diagram-js/lib/core/EventBus";
import type Modeling from "bpmn-js/lib/features/modeling/Modeling";
import type { Moddle } from "bpmn-js/lib/BaseViewer";

import magicPropertiesProviderModule from "@/components/propertiesPanelExtension/provider/magic";
import magicModdleDescriptor from "@/components/propertiesPanelExtension/descriptiors/magic.json";

// BPMN 挂载容器
const cavansDom = ref<HTMLElement | null>(null);

// BPMN 实例
let modeler: BpmnModeler | null = null;

onMounted(async () => {
  if (!cavansDom.value) return;
  // 创建 BPMN 编辑器实例
  modeler = new BpmnModeler({
    // 指定挂载容器
    container: cavansDom.value,
    // 属性面板配置
    propertiesPanel: {
      parent: "#js-properties-panel",
    },
    moddleExtensions: {
      camunda: CamundaBpmnModdle,
      jojo: SelfDescriptor,
      magic: magicModdleDescriptor,
    },
    // 额外模块
    additionalModules: [
      // 属性面板
      BpmnPropertiesPanelModule,
      // 属性提供器
      BpmnPropertiesProviderModule,

      // Camunda提供的右侧边栏属性
      // CamundaPlatformPropertiesProviderModule,

      // 自定义右侧边栏属性
      magicPropertiesProviderModule,
      // 汉化模块
      customTranslateModule,
    ],
  });

  // 监听事件
  // modelerListener();
  // eventBusListener();

  // 加载默认 XML
  await loadXml(xmlStr);
  // 自动缩放
  const canvans = modeler.get<Canvas>("canvas");
  canvans.zoom("fit-viewport");
});

onBeforeUnmount(() => {
  // 销毁实例
  modeler?.destroy();
  // 清空引用
  modeler = null;
});

// 加载 BPMN XML
async function loadXml(xml: string) {
  if (!modeler) return;
  try {
    await modeler.importXML(xml);
  } catch (e) {
    console.error("importXML error:", e);
  }

  modeler!.on("element.click", function (_event, eventObj) {
    const moddle = modeler!.get<Moddle>("moddle");

    // 自定义属性1
    const attrOne = moddle!.create("se:AttrOne", {
      name: "testAttrOne",
      values: [],
    });
    // 自定义属性子属性
    const attrOneProp = moddle!.create("se:AttrOneProp", {
      propName: "propName1",
      value: "propValue1",
    });
    // 自定义属性2
    const attrTwo = moddle!.create("se:AttrTwo", { value: "testAttrTwo" });
    // 原生属性Properties
    const props = moddle!.create("camunda:Properties", { values: [] });
    // 原生属性Properties的子属性
    const propItem = moddle.create("camunda:Property", {
      name: "原生子属性name",
      values: "原生子属性value",
    });
    // 原生扩展属性数组
    const extensions = moddle!.create("bpmn:ExtensionElements", { values: [] });

    // 开始节点插入原生属性
    if (eventObj.element.type === "bpmn:StartEvent") {
      props.values.push(propItem);
      extensions.values.push(props);
    }
    // 任务节点插入多种属性
    if (eventObj.element.type === "bpmn:UserTask") {
      props.values.push(propItem, propItem);

      attrOne.values.push(attrOneProp);

      extensions.values.push(props, attrOne, attrTwo);
    }
    // root插入自定义属性
    if (eventObj.element.type === "bpmn:Process") {
      attrOne.values.push(attrOneProp, attrOneProp);

      extensions.values.push(attrOne);
    }

    modeler!.get<Modeling>("modeling").updateProperties(eventObj.element, {
      extensionElements: extensions,
    });
  });
}
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
  const canvans = modeler?.get<Canvas>("canvas");
  canvans?.zoom("fit-viewport");
}

// 导出 XML
async function handleExportXML() {
  if (!modeler) return;
  // 获取 XML 数据
  const { xml } = await modeler.saveXML({
    format: true,
  });
  // 下载 XML 文件
  download("jojo.xml", xml as string, "application/xml");
}

// 导出 SVG
async function handleExportSVG() {
  if (!modeler) return;
  // 获取 SVG 数据
  const { svg } = await modeler.saveSVG();
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
  const canvas = modeler!.get<Canvas>("canvas");
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

function modelerListener() {
  if (!modeler) return;

  const events = ["shape.added", "shape.removed", "element.move.end"];

  events.forEach(function (event) {
    modeler?.on(event, function (e: any) {
      const elementRegistry = modeler?.get<ElementRegistry>("elementRegistry");
      const shape = e.element ? elementRegistry?.get(e.element.id) : e.element;
      console.log(shape);
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

function eventBusListener() {
  if (!modeler) return;
  const m = modeler;
  const eventBus = modeler.get<EventBus>("eventBus");

  const eventTypes = ["element.click", "element.changed"];

  eventTypes.forEach((eventType) => {
    eventBus.on(eventType, function (e: any) {
      if (!e || e.element.type === "bpmn:Process") return;
      // console.log("元素被点击", e);

      const elementRegistry = m.get<ElementRegistry>("elementRegistry");
      const shape = e.element ? elementRegistry?.get(e.element.id) : e.element;

      const modeling = m.get<Modeling>("modeling");

      if (eventType === "element.click") {
        if (shape.type === "bpmn:UserTask") {
          modeling.updateProperties(shape, {
            name: "点击修改的UserTask名称",
          });
        } else if (shape.type === "bpmn:StartEvent") {
          modeling.updateProperties(shape, {
            name: "点击修改的StartEvent名称",
            isInterrupting: false,
            customText: "自定义扩展属性值",
          });
        }
      }

      console.log(shape.businessObject);
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
  position: relative;
  padding: 20px;
  width: 100%;
  height: calc(100vh);
  // background-color: tomato;
}

.canvas {
  width: 100%;
  height: 600px;
  border: 2px solid #000;
  // background-color: orange;
}

.panel {
  position: absolute;
  right: 22px;
  top: 22px;
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
