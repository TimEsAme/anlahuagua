import BaseRenderer from "diagram-js/lib/draw/BaseRenderer"; // 引入默认的renderer
import { customElements, customConfig } from "../utils/util"; // 引入自定义元素和配置
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove,
} from "tiny-svg";

import { is } from "bpmn-js/lib/util/ModelUtil";

const HIGH_PRIORITY = 1500; // 最高优先级

export default class CustomRenderer extends BaseRenderer {
  // 继承BaseRenderer
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    // ignore labels
    return !element.labelTarget;
  }

  drawShape(parentNode, element) {
    // 使用svg画
    // const type = element.type; // 获取到类型
    // console.log(type)
    // if (customElements.includes(type)) {
    //   const { url, attr } = customConfig[type];
    //   const customIcon = svgCreate("image", {
    //     // 在这里创建了一个image
    //     ...attr,
    //     href: url,
    //   });
    //   element["width"] = attr.width;
    //   element["height"] = attr.height;
    //   svgAppend(parentNode, customIcon);
    //   return customIcon;
    // }
    // const shape = this.bpmnRenderer.drawShape(parentNode, element);
    // return shape;

    // 自己画
    const shape = this.bpmnRenderer.drawShape(parentNode, element);
    if (is(element, "bpmn:Task")) {
      // 当元素类型是 bpmn:Task 时
      const rect = drawRect(parentNode, 100, 80, 2, "#8a15b4");
      prependTo(rect, parentNode);
      svgRemove(shape);
      return shape;
    }
    return shape;
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape);
  }
}

CustomRenderer.$inject = ["eventBus", "bpmnRenderer"];

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
