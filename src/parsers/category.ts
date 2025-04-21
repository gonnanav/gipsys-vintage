import { Category } from '@/core/category';
import { parseWooCommerceCategories } from '@/services';

export function parseFirstCategory(rawCategories: unknown): Category | null {
  const categories = parseCategories(rawCategories);

  return categories[0] ?? null;
}

export function parseCategories(rawCategories: unknown): Category[] {
  return parseWooCommerceCategories(rawCategories);
}
