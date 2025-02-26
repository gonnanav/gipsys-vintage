import { NewProduct, Product } from './product';

export interface Application {
  getProduct(slug: string): Promise<Product | null>;
  getProducts(): Promise<Product[]>;
  replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]>;
}
