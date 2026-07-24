export default defineEventHandler(async () => {
  const res = await $fetch("http://localhost:3001/users");
  return res;
});
