import { NewProduct, ProductImage } from '@/core/product';

export interface WooCommerceProductInput {
  name?: string;
  regular_price?: string;
  description?: string;
  images?: ProductImage[];
}

export function toWooCommerceProductInput(product: NewProduct): WooCommerceProductInput {
  return {
    name: product.name,
    regular_price: product.price,
    description: product.description,
    images: product.images,
  };
}
