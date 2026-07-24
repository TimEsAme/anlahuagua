export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const body = await readBody(event);
  return await $fetch(`http://localhost:3001/users/${id}`, {
    method: "PUT",
    body,
    headers: {
      "content-Type": "application/json",
    },
  });
});
