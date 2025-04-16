import { Category, CategoryCreate } from '@/core/category';

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
