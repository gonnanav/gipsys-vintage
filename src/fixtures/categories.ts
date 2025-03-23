import { Category } from '@/core/category';

export const accessoriesCategory: Category = createCategory('אקססוריז', 'accessories');
export const topsCategory: Category = createCategory('חולצות', 'tops');

export function createCategory(name: string, slug: string): Category {
  return {
    id: Math.random(),
    name,
    slug,
  };
}
