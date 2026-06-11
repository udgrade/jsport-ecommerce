import { useFetch } from './useFetch';
import { api } from '../api';
import type { Category } from '../types';

export function useCategories() {
  return useFetch<Category[]>(api.getCategories);
}
