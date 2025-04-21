import { Product } from '@/core/product';
import { parseWooCommerceProducts, fromWooCommerceProduct } from '@/services';

export function parseFirstProduct(rawProducts: unknown): Product | null {
  const products = parseProducts(rawProducts);

  return products[0] ?? null;
}

export function parseProducts(rawProducts: unknown): Product[] {
  const wcProducts = parseWooCommerceProducts(rawProducts);

  return wcProducts.map(fromWooCommerceProduct);
}
