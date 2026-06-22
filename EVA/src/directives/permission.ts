import useUserStore from "@/store/modules/user";

export const permission = {
  mounted(el: HTMLElement, binding: any) {
    const userStore = useUserStore();
    // console.log(userStore.btnArr, 11111111);

    const required = binding.value;

    if (Array.isArray(required)) {
      const hasPermission = required.some((p) => userStore.btnArr.includes(p));

      if (!hasPermission) {
        el.parentNode?.removeChild(el);
      }
    }
  },
};
