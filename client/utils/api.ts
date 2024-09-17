const base_url = 'http://localhost:3000/api';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export async function call_api(method: Method, path: string, data?: any) {
  return call_url(method, `${base_url}${path}`, data);
}

export async function call_recipe_get_many(): Promise<any> {
  return call_api(Method.GET, '/recipes');
}

export async function call_recipe_upsert(name: string): Promise<any> {
  return call_api(Method.POST, '/recipe', { name });
}

export async function call_recipe_delete(name: string): Promise<any> {
  return call_api(Method.DELETE, `/recipe`, { name });
}

export async function call_recipe_upsert_ingredient(upsert_ingredient: {
  recipe: string;
  ingredient: string;
  amount: number;
}): Promise<any> {
  return call_api(Method.POST, '/recipe/ingredient', upsert_ingredient);
}

export async function call_recipe_delete_ingredient(recipe_ingredient: {
  recipe: string;
  ingredient: string;
}): Promise<any> {
  return call_api(Method.DELETE, `/recipe/ingredient`, recipe_ingredient);
}

export async function call_ingredient_get_many(): Promise<any> {
  return call_api(Method.GET, '/ingredients');
}

export async function call_ingredient_upsert(
  name: string,
  price: number,
): Promise<any> {
  return call_api(Method.POST, '/ingredient', { name, price });
}

export async function call_ingredient_delete(name: string): Promise<any> {
  return call_api(Method.DELETE, `/ingredient`, { name });
}

async function call_url(
  method: string,
  url: string,
  data?: any,
): Promisey<any> {
  return new Promise<any>(async (resolve, reject) => {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((e) => {
      alert('Etwas ist schief gelaufen. Versuche es später erneut!');
      console.error(e);
      reject();
    });
    try {
      resolve(await res.json());
    } catch (e) {
      resolve(null);
    }
  });
}
