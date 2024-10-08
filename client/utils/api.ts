// -------------------
// General
// -------------------
const api_base = '/api';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export async function call_api(method: Method, path: string, data?: any) {
  return call_url(method, `${api_base}${path}`, data);
}

export function call_url(
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
      server: true,
      body: JSON.stringify(data),
    }).catch((e) => {
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

// -------------------
// Events
// -------------------
export async function call_event_get_many(): Promise<any> {
  return call_api(Method.GET, '/events');
}

export async function call_event_find(name: string): Promise<any> {
  return call_api(Method.GET, `/events/${name}`);
}

export async function call_event_upsert(name: string): Promise<any> {
  return call_api(Method.POST, '/event', { name });
}

export async function call_event_delete(name: string): Promise<any> {
  return call_api(Method.DELETE, `/event`, { name });
}

export async function call_event_upsert_recipe(upsert_recipe: {
  event: string;
  recipe: string;
  amount: number;
}): Promise<any> {
  return call_api(Method.POST, '/event/recipe', upsert_recipe);
}

export async function call_event_delete_recipe(event_recipe: {
  event: string;
  recipe: string;
}): Promise<any> {
  return call_api(Method.DELETE, `/event/recipe`, event_recipe);
}

export async function call_event_ingredient_list(
  event_name: string,
): Promise<any> {
  return call_api(Method.GET, `/event/list/${event_name}`);
}

// -------------------
// Recipes
// -------------------
export async function call_recipe_get_many(): Promise<any> {
  return call_api(Method.GET, '/recipes');
}

export async function call_recipe_find(name: string): Promise<any> {
  return call_api(Method.GET, `/recipes/${name}`);
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

// -------------------
// Ingredients
// -------------------
export async function call_ingredient_get_many(): Promise<any> {
  return call_api(Method.GET, '/ingredients');
}

export async function call_ingredient_upsert(
  name: string,
  price: number,
  alcohol: number,
): Promise<any> {
  return call_api(Method.POST, '/ingredient', { name, price, alcohol });
}

export async function call_ingredient_delete(name: string): Promise<any> {
  return call_api(Method.DELETE, `/ingredient`, { name });
}
