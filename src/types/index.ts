export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface ProductImage {
  id: number;
  url: string;
  isPrimary: boolean;
  primary: boolean;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  base_price?: number;
  brand?: string;
  images?: ProductImage[];
  stock?: number;
  active?: boolean;
  category?: Category;
  categoryId?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type AppView =
  | { type: 'catalog' }
  | { type: 'product'; productId: number };
