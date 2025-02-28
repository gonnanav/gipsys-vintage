import { Category, CategoryCreate } from '@/core/category';

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WooCommerceCategoryInput {
  name: string;
  slug?: string;
}

export interface WooCommerceCategoryBatchUpdate {
  delete?: number[];
  create?: WooCommerceCategoryInput[];
}

export interface WooCommerceCategoryBatchUpdateResponse {
  delete?: WooCommerceCategory[];
  create?: WooCommerceCategory[];
}

export function fromWooCommerceCategory(category: WooCommerceCategory): Category {
  return {
    ...category,
  };
}

export function toWooCommerceCategoryInput(category: CategoryCreate): WooCommerceCategoryInput {
  return {
    ...category,
  };
}
