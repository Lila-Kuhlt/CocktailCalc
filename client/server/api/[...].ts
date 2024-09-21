import { defineEventHandler, sendProxy } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const target_url = `${config.apiBase}${event.node.req.url}`;
  const method = event.node.req.method;
  const body = method !== 'GET' ? await readBody(event) : undefined;

  return sendProxy(event, target_url, {
    fetchOptions: {
      method: event.node.req.method,
      headers: event.node.req.headers,
      body: JSON.stringify(body),
    },
  });
});
