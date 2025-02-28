/**
 * Represents a new product to be created in the system.
 * This type is used when creating products, before they have been assigned an ID and slug.
 */
export interface ProductCreate {
  /** The product's display name */
  name: string;

  /**
   * The product's price as a string.
   * Must be a valid decimal number in string format (e.g., "99.99")
   */
  price: string;

  /** Optional detailed description of the product */
  description?: string;

  /** Optional array of product images */
  images?: ProductImage[];
}

/**
 * Represents a product in the system.
 * This is the core domain type that includes all product information.
 * It extends NewProduct with system-assigned fields (id, slug).
 */
export interface Product {
  /** Unique identifier for the product */
  id: number;

  /** The product's display name */
  name: string;

  /** URL-friendly identifier, auto-generated from name */
  slug: string;

  /**
   * The product's price as a string.
   * Must be a valid decimal number in string format (e.g., "99.99")
   */
  price: string;

  /** Optional detailed description of the product */
  description?: string;

  /** Optional array of product images */
  images?: ProductImage[];
}

/**
 * Represents an image associated with a product.
 */
export interface ProductImage {
  /** URL of the image */
  src: string;

  /** Optional alt text for accessibility */
  alt?: string;
}
