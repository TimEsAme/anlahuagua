export function debounce(fn: Function, delay: number = 500) {
  let timer: any;
  return function (...args: any[]) {
    timer = setTimeout(() => {
      if (timer) clearTimeout(timer);
      fn(...args);
    }, delay);
  };
}
