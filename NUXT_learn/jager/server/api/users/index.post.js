export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await $fetch(`http://localhost:3001/users`, {
    method: "POST",
    body,
    headers: {
      "content-Type": "application/json",
    },
  });
});
