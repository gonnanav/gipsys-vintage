import { Category } from '@/core/category';
import {
  parseWooCommerceCategories,
  parseWooCommerceCategoriesBatchUpdate,
} from './woocommerce/category';

export function parseFirstCategory(rawCategories: unknown): Category | null {
  const categories = parseCategories(rawCategories);

  return categories[0] ?? null;
}

export function parseCategoriesIds(rawCategories: unknown): number[] {
  const categories = parseCategories(rawCategories);

  return categories.map((category) => category.id);
}

export function parseCategories(rawCategories: unknown): Category[] {
  return parseWooCommerceCategories(rawCategories);
}

export function parseCategoriesBatchUpdate(rawCategories: unknown): Category[] {
  const { create } = parseWooCommerceCategoriesBatchUpdate(rawCategories);

  return create;
}
