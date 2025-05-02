import { z } from 'zod';
import { createProduct, Product, ProductCreate } from '@/core/product';

const productImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  regular_price: z.string(),
  description: z.string(),
  images: z.array(productImageSchema),
  menu_order: z.number(),
});

const productsSchema = z.array(productSchema);

const productsBatchUpdateSchema = z.object({
  create: productsSchema,
});

type WCProductImage = z.infer<typeof productImageSchema>;
type WCProduct = z.infer<typeof productSchema>;
type WCProductsBatchUpdate = z.infer<typeof productsBatchUpdateSchema>;

export function parseWooCommerceProducts(result: unknown): WCProduct[] {
  return productsSchema.parse(result);
}

export function parseWooCommerceProductsBatchUpdate(result: unknown): WCProductsBatchUpdate {
  return productsBatchUpdateSchema.parse(result);
}

export interface WCProductInput {
  name?: string;
  regular_price?: string;
  description?: string;
  images?: WCProductImage[];
  categories?: { id: number }[];
}

export function fromWooCommerceProduct(product: WCProduct): Product {
  const { regular_price, menu_order, ...rest } = product;

  return createProduct({
    ...rest,
    price: regular_price,
    sortOrder: menu_order,
  });
}

export function toWooCommerceProductInput(product: ProductCreate): WCProductInput {
  const { price, categoryId, sortOrder, ...rest } = product;
  const categories = categoryId && [{ id: categoryId }];

  return {
    ...rest,
    regular_price: price,
    ...(categories && { categories }),
    ...(sortOrder && { menu_order: sortOrder }),
  };
}
