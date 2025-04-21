import { z } from 'zod';

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

const categoriesSchema = z.array(categorySchema);

const categoriesBatchUpdateSchema = z.object({
  create: categoriesSchema,
});

type WCCategory = z.infer<typeof categorySchema>;
type WCCategoriesBatchUpdate = z.infer<typeof categoriesBatchUpdateSchema>;

export function parseWooCommerceCategories(result: unknown): WCCategory[] {
  return categoriesSchema.parse(result);
}

export function parseWooCommerceCategoriesBatchUpdate(result: unknown): WCCategoriesBatchUpdate {
  return categoriesBatchUpdateSchema.parse(result);
}
