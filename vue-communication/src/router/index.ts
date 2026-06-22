import { createRouter, createWebHistory } from "vue-router";
import Props from "@/pages/01_props/Father.vue";
import Event from "@/pages/02_custom-event/Father.vue";
import Bus from "@/pages/03_mitt/Father.vue";
import Model from "@/pages/04_v-model/Father.vue";
import AttrsListeners from "@/pages/05_$attrs/Father.vue";
import RefChildrenParent from "@/pages/06_$refs-$parent/Father.vue";
import ProvideInject from "@/pages/07_provide-inject/Father.vue";
// import Slot from "@/pages/08_slot_默认插槽/Father.vue";
// import Slot from "@/pages/08_slot_具名插槽/Father.vue";
import Slot from "@/pages/08_slot_作用域插槽/Father.vue";
import Jojo from "@/pages/00_Home/jojo.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Jojo,
    },
    {
      path: "/props",
      component: Props,
    },
    {
      path: "/event",
      component: Event,
    },
    {
      path: "/mitt",
      component: Bus,
    },
    {
      path: "/model",
      component: Model,
    },
    {
      path: "/attrs",
      component: AttrsListeners,
    },
    {
      path: "/ref-parent",
      component: RefChildrenParent,
    },
    {
      path: "/provide-inject",
      component: ProvideInject,
    },
    {
      path: "/slot",
      component: Slot,
    },
  ],
});
