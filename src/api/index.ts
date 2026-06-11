const BASE_URL = 'https://backend-jsport-ecommerce.onrender.com/api';

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  getProducts: () => fetchJson<import('../types').Product[]>('/products'),
  getCategories: () => fetchJson<import('../types').Category[]>('/categories'),
};
