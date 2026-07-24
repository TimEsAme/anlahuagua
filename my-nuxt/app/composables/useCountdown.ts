export function useCountdown(targetTime: Date) {
  const remainingTime = ref("");

  // 更新倒计时
  const updateCountdown = () => {
    const now = new Date();
    const diff = targetTime.getTime() - now.getTime();

    if (diff <= 0) {
      remainingTime.value = "Time’s up!";
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    remainingTime.value = `${hours}h ${minutes}m ${seconds}s`;
  };

  // 启动定时器
  let interval: NodeJS.Timeout | null = null;
  onMounted(() => {
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
  });

  // 清理定时器
  onUnmounted(() => {
    if (interval) clearInterval(interval);
  });

  return { remainingTime };
}
