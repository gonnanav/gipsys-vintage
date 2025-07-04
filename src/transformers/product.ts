import { Product } from '@/core/product';
import {
  parseWooCommerceProducts,
  fromWooCommerceProduct,
  parseWooCommerceProductsBatchUpdate,
} from './woocommerce/product';

export function parseFirstProduct(rawProducts: unknown): Product | null {
  const products = parseProducts(rawProducts);

  return products[0] ?? null;
}

export function parseProductsIds(rawProducts: unknown): number[] {
  const products = parseProducts(rawProducts);

  return products.map((product) => product.id);
}

export function parseProducts(rawProducts: unknown): Product[] {
  const wcProducts = parseWooCommerceProducts(rawProducts);
  const products = wcProducts.map(fromWooCommerceProduct);

  return products.sort((a, b) => a.sortOrder - b.sortOrder);
}

export function parseProductsBatchUpdate(rawProducts: unknown): Product[] {
  const { create } = parseWooCommerceProductsBatchUpdate(rawProducts);

  return create.map(fromWooCommerceProduct);
}
