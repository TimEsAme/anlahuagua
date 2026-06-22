import { useBpmnStore } from "../../../store/bpmn.ts";
import pinia from '../../../store/index.ts'  // 需要导出 pinia 实例
import { setActivePinia } from 'pinia'
setActivePinia(pinia) // 手动激活
const bpmnStore = useBpmnStore();


export default function ContextPadProvider(
    contextPad,
    config,
    injector,
    translate,
    bpmnFactory,
    elementFactory,
    create,
    modeling
) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.bpmnFactory = bpmnFactory;
    this.modeling = modeling;
    config = config || {};
    if (config.autoPlace !== false) {
        this._autoPlace = injector.get("autoPlace", false);
    }
    contextPad.registerProvider(this);
}

ContextPadProvider.$inject = [
    "contextPad",
    "config",
    "injector",
    "translate",
    "bpmnFactory",
    "elementFactory",
    "create",
    "modeling"
];

ContextPadProvider.prototype.getContextPadEntries = function (element) {
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
        bpmnStore.toggleNodeVisible(true);
        bpmnStore.setNodeInfo(element);
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
};