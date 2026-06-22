import { computed, onMounted, ref } from "vue";

export default function () {
  let sum = ref(0);
  function add() {
    sum.value++;
  }
  let bigSum = computed(() => {
    return sum.value * 10;
  });

  onMounted(() => {
    add();
  });

  return { sum, add, bigSum };
}
