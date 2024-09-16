const base_url = 'http://localhost:3000/api';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export async function call_api(method: Method, path: string, data?: any) {
  return call_url(method, `${base_url}${path}`, data);
}

async function call_url(
  method: string,
  url: string,
  data?: any,
): Promisey<any | null> {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    return await res.json();
  } catch (e) {
    return null;
  }
}
