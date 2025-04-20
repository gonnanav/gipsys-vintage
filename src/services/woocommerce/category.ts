import { z } from 'zod';

const categoriesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  }),
);

export function parseCategories(result: unknown): WCCategory[] {
  return categoriesSchema.parse(result);
}

const categoriesBatchUpdateSchema = z.object({
  create: categoriesSchema,
});

export function parseCategoriesBatchUpdate(result: unknown): WCCategoryBatchUpdateResponse {
  return categoriesBatchUpdateSchema.parse(result);
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

export type WCCategoryBatchUpdateResponse = z.infer<typeof categoriesBatchUpdateSchema>;
