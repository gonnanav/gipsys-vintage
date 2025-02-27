import { ProductImage } from '@/core/product';

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  regular_price: string;
  description: string;
  images: ProductImage[];
}

export interface WooCommerceProductInput {
  name?: string;
  regular_price?: string;
  description?: string;
  images?: ProductImage[];
}
