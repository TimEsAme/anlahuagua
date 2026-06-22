export const getTime = () => {
  let message: string = "";
  const t = new Date().getHours();
  if (t <= 9) {
    message = "早上好";
  } else if (t <= 12) {
    message = "中午好";
  } else if (t <= 18) {
    message = "下午好";
  } else {
    message = "晚上好";
  }
  return message;
};
