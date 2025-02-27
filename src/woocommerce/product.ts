import { NewProduct, ProductImage } from '@/core/product';

export interface WooCommerceProductInput {
  name?: string;
  regular_price?: string;
  description?: string;
  images?: ProductImage[];
}

export function toWooCommerceProductInput(product: NewProduct): WooCommerceProductInput {
  const { price, ...rest } = product;

  return {
    ...rest,
    regular_price: price,
  };
}
