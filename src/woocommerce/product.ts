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

export interface WooCommerceProductBatchUpdate {
  delete?: number[];
  create?: WooCommerceProductInput[];
}

export interface WooCommerceProductBatchUpdateResponse {
  delete?: WooCommerceProduct[];
  create?: WooCommerceProduct[];
}
