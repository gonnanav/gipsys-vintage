import { z } from 'zod';
import { createProduct, Product, ProductCreate } from '@/core/product';

const productsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    regular_price: z.string(),
    description: z.string(),
    images: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    ),
  }),
);

export function parseProducts(result: unknown): WCProduct[] {
  return productsSchema.parse(result);
}

const productsBatchUpdateSchema = z.object({
  create: productsSchema,
});

export function parseProductsBatchUpdate(result: unknown): WCProductBatchUpdateResponse {
  return productsBatchUpdateSchema.parse(result);
}

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

export type WCProductBatchUpdateResponse = z.infer<typeof productsBatchUpdateSchema>;

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
