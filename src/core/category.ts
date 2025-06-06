import { Product } from './product';

/**
 * Represents a new category to be created in the system.
 * This type is used when creating categories, before they have been assigned an ID.
 */
export interface CategoryCreate {
  /** The category's display name */
  name: string;

  /** URL-friendly identifier for the category */
  slug?: string;
}

/**
 * Represents a category in the system.
 * This is the core domain type that includes all category information.
 * It extends CategoryCreate with system-assigned fields (id).
 */
export interface Category extends CategoryCreate {
  /** Unique identifier for the category */
  id: number;
}

/**
 * Represents a category along with all its associated products.
 * This type is used when we need to fetch both a category and its products together.
 */
export interface CategoryWithProducts extends Category {
  /** Array of products belonging to this category */
  products: Product[];
}
