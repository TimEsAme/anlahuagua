import { onUnmounted, ref } from "vue";
import { useUltramanStore } from "@/store/Ultraman";
import { nanoid } from "nanoid";
import { storeToRefs } from "pinia";

export default function () {
  let name = ref("");
  const Ultraman = useUltramanStore();
  const { UltramanList } = storeToRefs(Ultraman);

  // 添加
  function addUltraman() {
    if (!name.value) return alert("输入不能为空!!!");
    let obj = {
      id: nanoid(),
      name: name.value,
      done: false,
    };
    UltramanList.value.unshift(obj);
    name.value = "";
  }

  // const unsubscribe = Ultraman.$subscribe((mutation, state) => {
  //   // console.log(state.UltramanList);
  //   localStorage.setItem("Ultraman", JSON.stringify(state.UltramanList));
  // });

  // onUnmounted(() => {
  //   unsubscribe(); // 组件卸载后取消订阅
  // });
  return { name, addUltraman };
}
