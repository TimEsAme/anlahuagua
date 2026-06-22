<template>
  <div>
    <!-- <BpmnViewer></BpmnViewer> -->
    <!-- <BpmnModeler_1></BpmnModeler_1> -->
    <!-- <BpmnModeler_2></BpmnModeler_2> -->
    <!-- <BpmnModeler_custom></BpmnModeler_custom> -->
    <BpmnModeler_Modeler></BpmnModeler_Modeler>
  </div>
</template>

<script lang="ts" setup>
// 只能看
// import BpmnViewer from "./components/BpmnViewer.vue";

// 基础版本,不带按钮功能
// import BpmnModeler_1 from "./components/BpmnModeler_1.vue";
// 完整官方版本,带按钮功能,没有自定义
// import BpmnModeler_2 from "./components/BpmnModeler_2.vue";

// 自定义版本custom版本,在官方的BpmnModeler注册自己的模块
// import BpmnModeler_custom from "./components/BpmnModeler_custom.vue";

// 自定义版本Modeler版本,使用自己的CustomModeler
import BpmnModeler_Modeler from "./components/BpmnModeler_Modeler.vue";
</script>

<style scoped lang="scss"></style>
