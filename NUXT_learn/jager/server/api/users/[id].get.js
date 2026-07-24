export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  return await $fetch(`http://localhost:3001/users/${id}`, {
    method: "GET",
  });
});
