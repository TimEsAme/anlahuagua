export default class CustomContextPad {
  constructor(config, contextPad, create, elementFactory, injector, translate, modeling) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.modeling = modeling;

    // autoPlace 是 bpmn-js 内置的一个服务
    // 自动计算新元素的摆放位置，并直接把新节点加到当前图上。
    // 开发者可以通过 config.autoPlace: false 禁用自动布局，改为手动拖拽
    if (config.autoPlace !== false) {
      this.autoPlace = injector.get("autoPlace", false);
    }

    contextPad.registerProvider(this); // 定义这是一个contextPad
  }

  getContextPadEntries(element) {
    const { autoPlace, create, elementFactory, translate, modeling } = this;

    function appendTask(event, element) {
      // 自动插入到默认位置
      if (autoPlace) {
        const shape = elementFactory.createShape({ type: "bpmn:Task" });
        autoPlace.append(element, shape);
      } else {
        // 进入拖拽模式，让用户自己放置
        appendTaskStart(event, element);
      }
    }

    function appendTaskStart(event) {
      const shape = elementFactory.createShape({ type: "bpmn:Task" });
      create.start(event, shape, element);
    }

    // 编辑元素
    function editElement() {
      return {
        group: "edit",
        className: "icon-custom icon-custom-edit",
        title: translate("编辑"),
        action: {
          click: clickElement,
        },
      };
    }
    // 删除元素
    function deleteElement() {
      return {
        group: "edit",
        className: "icon-custom icon-custom-delete",
        title: translate("删除"),
        action: {
          click: removeElement,
        },
      };
    }
    // 删除功能
    function removeElement(e) {
      modeling.removeElements([element]);
    }

    function clickElement(e) {
      console.log(element, e);
    }

    return {
      "append.duyi-task-icon": {
        group: "model",
        className: "icon-custom jojo-task",
        title: translate("创建一个类型为duyi-task-icon的任务节点"),
        action: {
          click: appendTask,
          dragstart: appendTaskStart,
        },
      },
      edit: editElement(),
      delete: deleteElement(),
    };
  }
}

CustomContextPad.$inject = [
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
  "modeling"
];