import { NewProduct, Product } from './product';

/**
 * Primary port for the application, following the Ports and Adapters (Hexagonal Architecture) pattern.
 * This interface defines the core operations that our application can perform, independent of any
 * specific e-commerce platform or UI framework.
 *
 * Implementation notes:
 * - All methods return Promises to support async operations
 * - Methods follow a clear, domain-focused naming convention
 * - Error handling should be implemented by the adapters
 *
 * @example
 * ```typescript
 * class WooCommerceAdapter implements Application {
 *   async getProducts(): Promise<Product[]> {
 *     // Implementation specific to WooCommerce
 *   }
 * }
 * ```
 */
export interface Application {
  /**
   * Retrieves a single product by its URL slug.
   *
   * @param slug - The URL-friendly identifier for the product
   * @returns Promise resolving to the product if found, null otherwise
   * @throws May throw if there's a network or system error
   */
  getProduct(slug: string): Promise<Product | null>;
  /**
   * Retrieves all available products.
   *
   * @returns Promise resolving to an array of products
   * @throws May throw if there's a network or system error
   */
  getProducts(): Promise<Product[]>;
  /**
   * Replaces the entire product catalog with a new set of products.
   * This is a destructive operation that should be used with caution.
   *
   * @param newProducts - Array of new products to replace the existing catalog
   * @returns Promise resolving to the array of created products with their assigned IDs
   * @throws May throw if there's a validation, network, or system error
   */
  replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]>;
}
