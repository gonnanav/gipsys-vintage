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
  alt?: string;
}
