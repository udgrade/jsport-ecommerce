import { useFetch } from './useFetch';
import { api } from '../api';
import type { Product } from '../types';

export function useProducts() {
  return useFetch<Product[]>(api.getProducts);
}
