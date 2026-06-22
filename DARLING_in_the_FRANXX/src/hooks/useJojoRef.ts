import { customRef } from "vue";

export default function (dio: string, delay: number) {
  let timer: number;
  let jojo = customRef((track, trigger) => {
    return {
      get() {
        track();
        return dio;
      },
      set(v: any) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          dio = v;
          trigger();
        }, delay);
      },
    };
  });

  return { jojo };
}
