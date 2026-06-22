export default class CustomPalette {
  constructor(
    bpmnFactory,
    palette,
    create,
    elementFactory,
    spaceTool,
    lassoTool,
    handTool,
    globalConnect,
    translate
  ) {
    this.bpmnFactory = bpmnFactory;
    this.palette = palette;
    this.create = create;
    this.elementFactory = elementFactory;
    this.spaceTool = spaceTool;
    this.lassoTool = lassoTool;
    this.handTool = handTool;
    this.globalConnect = globalConnect;
    this.translate = translate;
    palette.registerProvider(this);
  }

  getPaletteEntries() {
    const {
      bpmnFactory,
      palette,
      create,
      elementFactory,
      spaceTool,
      lassoTool,
      handTool,
      globalConnect,
      translate,
    } = this;

    function createTask(type) {
      return function (event) {
        const shape = elementFactory.createShape({ type: type });
        create.start(event, shape);
      };
    }

    function createSubprocess(event) {
      var subProcess = elementFactory.createShape({
        type: 'bpmn:SubProcess',
        x: 0,
        y: 0,
        isExpanded: true
      });

      var startEvent = elementFactory.createShape({
        type: 'bpmn:StartEvent',
        x: 40,
        y: 82,
        parent: subProcess
      });

      create.start(event, [subProcess, startEvent], {
        hints: {
          autoSelect: [subProcess]
        }
      });
    }

    function createParticipant(event) {
      create.start(event, elementFactory.createParticipantShape());
    }

    return {
      "hand-tool": {
        group: "tools",
        className: "bpmn-icon-hand-tool",
        title: translate("Activate hand tool"),
        action: {
          click: function (event) {
            handTool.activateHand(event);
          },
        },
      },

      'lasso-tool': {
        group: 'tools',
        className: 'bpmn-icon-lasso-tool',
        title: translate('Activate lasso tool'),
        action: {
          click: function (event) {
            lassoTool.activateSelection(event);
          }
        }
      },

      'space-tool': {
        group: 'tools',
        className: 'bpmn-icon-space-tool',
        title: translate('Activate create/remove space tool'),
        action: {
          click: function (event) {
            spaceTool.activateSelection(event);
          }
        }
      },

      'global-connect-tool': {
        group: 'tools',
        className: 'bpmn-icon-connection-multi',
        title: translate('Activate global connect tool'),
        action: {
          click: function (event) {
            globalConnect.start(event);
          }
        }
      },

      'tool-separator': {
        group: 'tools',
        separator: true
      },

      'create.start-event': {
        group: "event",
        className: "icon-custom start-icon",
        title: translate('创建开始节点'),
        action: {
          dragstart: createTask('bpmn:StartEvent'),
          click: createTask('bpmn:StartEvent'),
        },
      },

      'create.intermediate-event': {
        group: "event",
        className: "bpmn-icon-intermediate-event-none blue",
        title: translate('创建中间/边界事件节点'),
        action: {
          dragstart: createTask('bpmn:IntermediateThrowEvent'),
          click: createTask('bpmn:IntermediateThrowEvent'),
        },
      },

      'create.end-event': {
        group: "event",
        className: "bpmn-icon-end-event-none red",
        title: translate('创建开始节点'),
        action: {
          dragstart: createTask('bpmn:EndEvent'),
          click: createTask('bpmn:EndEvent'),
        },
      },

      'create.exclusive-gateway': {
        group: "gateway",
        className: "bpmn-icon-gateway-none",
        title: translate('创建网关节点'),
        action: {
          dragstart: createTask('bpmn:ExclusiveGateway'),
          click: createTask('bpmn:ExclusiveGateway'),
        },
      },

      "create.UserTask": {
        group: "activity",
        className: "bpmn-icon-user-task",
        title: translate("创建管理员任务节点"),
        action: {
          dragstart: createTask('bpmn:UserTask'),
          click: createTask('bpmn:UserTask'),
        },
      },

      "create.task": {
        group: "activity",
        className: "bpmn-icon-task blue",
        title: translate("创建任务节点"),
        action: {
          dragstart: createTask('bpmn:Task'),
          click: createTask('bpmn:Task'),
        },
      },

      'create.subprocess-expanded': {
        group: 'activity',
        className: 'bpmn-icon-subprocess-expanded',
        title: translate('创建扩展子过程'),
        action: {
          dragstart: createSubprocess,
          click: createSubprocess
        }
      },

      "create.data-object": {
        group: "data-object",
        className: "bpmn-icon-data-object",
        title: translate("创建扩展子过程节点"),
        action: {
          dragstart: createTask('bpmn:DataObjectReference'),
          click: createTask('bpmn:DataObjectReference'),
        },
      },

      "create.data-store": {
        group: "data-store",
        className: "bpmn-icon-data-store",
        title: translate("创建数据存储引用节点"),
        action: {
          dragstart: createTask('bpmn:DataStoreReference'),
          click: createTask('bpmn:DataStoreReference'),
        },
      },

      'create.participant-expanded': {
        group: 'collaboration',
        className: 'bpmn-icon-participant',
        title: translate('创建池/参与者'),
        action: {
          dragstart: createParticipant,
          click: createParticipant
        }
      },

      "create.group": {
        group: "artifact",
        className: "bpmn-icon-group",
        title: translate("创建组"),
        action: {
          dragstart: createTask('bpmn:Group'),
          click: createTask('bpmn:Group'),
        },
      },
    };
  }
}

CustomPalette.$inject = [
  "bpmnFactory",
  "palette",
  "create",
  "elementFactory",
  "spaceTool",
  "lassoTool",
  "handTool",
  "globalConnect",
  "translate",
];
