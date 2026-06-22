import { onBeforeUnmount, onMounted, ref } from "vue";

export const width = 1920;
export const height = 1080;

type ResizeType = {
  w?: number;
  h?: number;
  fullScreen?: boolean;
  delay?: number;
};

export const useResize = (optins: ResizeType = {}) => {
  const { w = width, h = height, fullScreen = false, delay = 300 } = optins;
  const screenRef = ref();
  const scale = ref(1);

  function resize() {
    const clientWidth = document.body.clientWidth;
    const clientHeight = document.body.clientHeight;
    const scaleW = clientWidth / w;
    const scaleH = clientHeight / h;

    if (fullScreen) {
      screenRef.value.style.transform = `scale(${scaleW}, ${scaleH})`;
    } else {
      scale.value = Math.min(scaleW, scaleH);
      // 用 translate 居中
      const x = (clientWidth - w * scale.value) / (2 * scale.value);
      const y = (clientHeight - h * scale.value) / (2 * scale.value);

      screenRef.value.style.transform = `scale(${scale.value}) translate(${x}px, ${y}px)`;
      // 清除 left/top 避免干扰
      screenRef.value.style.left = "auto";
      screenRef.value.style.top = "auto";
    }
  }
  const resizeDelay = debounce(resize, delay);
  onMounted(() => {
    if (screenRef.value) {
      resize();
      window.addEventListener("resize", resizeDelay);
    }
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeDelay);
  });

  return { screenRef, scale };
};

function debounce(fn: Function, delay: number) {
  let timer: number | null;
  return function (...args: any[]): void {
    if (timer) clearTimeout(timer);
    timer = setTimeout(
      () => {
        typeof fn === "function" && fn.apply(null, args);
        timer = null;
      },
      delay > 0 ? delay : 100,
    );
  };
}
