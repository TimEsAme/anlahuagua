import inherits from "inherits-browser";

import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";

import { is } from "bpmn-js/lib/util/ModelUtil";

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove,
} from "tiny-svg";

const HIGH_PRIORITY = 1500;
export default function CustomRenderer(eventBus, bpmnRenderer) {
  BaseRenderer.call(this, eventBus, HIGH_PRIORITY);
  this.bpmnRenderer = bpmnRenderer;

  this.drawCustomElements = function (parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    if (is(element, "bpmn:Task")) {
      // 当元素类型是 bpmn:Task 时
      const rect = drawRect(parentNode, 100, 80, 2, "teal"); // 创建一个带绿色边框的矩形
      prependTo(rect, parentNode);
      svgRemove(shape);
      return shape;
    }
    return shape;
  };
}

inherits(CustomRenderer, BaseRenderer);

CustomRenderer.$inject = ["eventBus", "bpmnRenderer"];

CustomRenderer.prototype.canRender = function (element) {
  // ignore labels
  return !element.labelTarget;
};

CustomRenderer.prototype.drawShape = function (p, element) {
  return this.drawCustomElements(p, element);
};

CustomRenderer.prototype.getShapePath = function (parentNode, element) {
  return this.bpmnRenderer.getShapePath(parentNode, element);
}

// copied from bpmn-js/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, strokeColor) {
  const rect = svgCreate("rect");

  svgAttr(rect, {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: strokeColor || "#000",
    strokeWidth: 2,
    fill: "#fff",
  });

  svgAppend(parentNode, rect);

  return rect;
}

// copied from /diagram-js/lib/core/GraphicsFactory.js
function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}
