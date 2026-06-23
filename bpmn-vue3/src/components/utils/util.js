const customElements = ["bpmn:Task"]; // 自定义元素的类型
const customConfig = {
  // 自定义元素的配置
  "bpmn:Task": {
    url: "/src/assets/box.png",
    attr: { x: 0, y: 0, width: 48, height: 48 },
  },
};

export { customElements, customConfig };
