import { Category } from '@/core/category';
import { NavCategory } from '@/components/layout';
import { parseCategories } from './category';

export function parseNavCategories(rawCategories: unknown): NavCategory[] {
  const categories = parseCategories(rawCategories);

  return categories.map(toNavCategory);
}

export function toNavCategory(category: Category): NavCategory {
  const { id, name, slug } = category;

  return {
    id,
    name,
    href: `/shop/${slug}`,
  };
}
