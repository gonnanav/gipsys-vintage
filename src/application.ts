import * as wc from '@/woocommerce';

export interface NewProduct {
  name: string;
}

export interface Product {
  id: number;
  name: string;
}

export async function getProducts(): Promise<Product[]> {
  return wc.getProducts();
}

export async function replaceAllProducts(newProducts: NewProduct[]) {
  return wc.replaceAllProducts(newProducts);
}
