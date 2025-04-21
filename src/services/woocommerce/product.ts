import { createProduct, Product, ProductCreate } from '@/core/product';

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  regular_price: string;
  description: string;
  images: WCProductImage[];
}

export interface WCProductInput {
  name?: string;
  regular_price?: string;
  description?: string;
  images?: WCProductImage[];
  categories?: { id: number }[];
}

export interface WCProductBatchUpdate {
  delete?: number[];
  create?: WCProductInput[];
}

export interface WCProductImage {
  src: string;
  alt: string;
}

export function fromWooCommerceProduct(product: WCProduct): Product {
  const { regular_price, ...rest } = product;

  return createProduct({
    ...rest,
    price: regular_price,
  });
}

export function toWooCommerceProductInput(product: ProductCreate): WCProductInput {
  const { price, categoryId, ...rest } = product;
  const categories = categoryId && [{ id: categoryId }];

  return {
    ...rest,
    regular_price: price,
    ...(categories && { categories }),
  };
}
