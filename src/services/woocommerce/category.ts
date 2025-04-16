import { z } from 'zod';
import { Category, CategoryCreate } from '@/core/category';

const categoriesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  }),
);

export function parseCategories(result: unknown): Category[] {
  return categoriesSchema.parse(result).map(fromWooCommerceCategory);
}

const categoriesBatchUpdateSchema = z.object({
  create: categoriesSchema,
});

export function parseCategoriesBatchUpdate(result: unknown): Category[] {
  return categoriesBatchUpdateSchema.parse(result).create.map(fromWooCommerceCategory);
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WCCategoryInput {
  name: string;
  slug?: string;
}

export interface WCCategoryBatchUpdate {
  delete?: number[];
  create?: WCCategoryInput[];
}

export interface WCCategoryBatchUpdateResponse {
  delete?: WCCategory[];
  create?: WCCategory[];
}

export function fromWooCommerceCategory(category: WCCategory): Category {
  return {
    ...category,
  };
}

export function toWooCommerceCategoryInput(category: CategoryCreate): WCCategoryInput {
  return {
    ...category,
  };
}
