import { Product, ProductCreate } from '@/core/product';

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  regular_price: string;
  description: string;
  images: WooCommerceProductImage[];
}

export interface WooCommerceProductInput {
  name?: string;
  regular_price?: string;
  description?: string;
  images?: WooCommerceProductImage[];
  categories?: { id: number }[];
}

export interface WooCommerceProductBatchUpdate {
  delete?: number[];
  create?: WooCommerceProductInput[];
}

export interface WooCommerceProductBatchUpdateResponse {
  delete?: WooCommerceProduct[];
  create?: WooCommerceProduct[];
}

export interface WooCommerceProductImage {
  src: string;
  alt: string;
}

export function fromWooCommerceProduct(product: WooCommerceProduct): Product {
  const { regular_price, ...rest } = product;

  return {
    ...rest,
    price: regular_price,
  };
}

export function toWooCommerceProductInput(product: ProductCreate): WooCommerceProductInput {
  const { price, categoryId, ...rest } = product;
  const categories = categoryId && [{ id: categoryId }];

  return {
    ...rest,
    regular_price: price,
    ...(categories && { categories }),
  };
}
