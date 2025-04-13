import { Product } from './product';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export interface CategoryCreate {
  name: string;
  slug?: string;
}
