import { Product, ProductCreate } from '@/core/product';
import { Category, CategoryCreate, CategoryWithProducts } from '@/core/category';
import { WooCommerceApi } from '@/woocommerce/api';
import { fromWooCommerceProduct, toWooCommerceProductInput } from '@/woocommerce/product';
import { fromWooCommerceCategory, toWooCommerceCategoryInput } from '@/woocommerce/category';

export class Application {
  private readonly api: WooCommerceApi;

  constructor(api: WooCommerceApi) {
    this.api = api;
  }

  /**
   * Retrieves a single product by its URL slug.
   *
   * @param slug - The URL-friendly identifier for the product
   * @returns Promise resolving to the product if found, null otherwise
   * @throws May throw if there's a network or system error
   */
  async getProduct(slug: string): Promise<Product | null> {
    const wcProducts = await this.api.getProducts({ slug });

    if (!wcProducts || wcProducts.length === 0) return null;

    return fromWooCommerceProduct(wcProducts[0]);
  }

  /**
   * Retrieves all available products.
   *
   * @returns Promise resolving to an array of products
   * @throws May throw if there's a network or system error
   */
  async getProducts(): Promise<Product[]> {
    const wcProducts = await this.api.getProducts();

    return wcProducts.map(fromWooCommerceProduct);
  }

  /**
   * Replaces the entire product catalog with a new set of products.
   * This is a destructive operation that should be used with caution.
   *
   * @param newProducts - Array of new products to replace the existing catalog
   * @returns Promise resolving to the array of created products with their assigned IDs
   * @throws May throw if there's a validation, network, or system error
   */
  async replaceAllProducts(newProducts: ProductCreate[]): Promise<Product[]> {
    const oldProducts = await this.getProducts();
    const oldProductIds = oldProducts.map((product) => product.id);
    const wcProducts = newProducts.map(toWooCommerceProductInput);

    const { create: createdProducts = [] } = await this.api.batchUpdateProducts({
      delete: oldProductIds,
      create: wcProducts,
    });

    return createdProducts.map(fromWooCommerceProduct);
  }

  /**
   * Replaces all product categories with a new set of categories.
   * This is a destructive operation that should be used with caution.
   *
   * @param newCategories - Array of new categories to replace the existing ones
   * @returns Promise resolving to the array of created categories with their assigned IDs
   * @throws May throw if there's a validation, network, or system error
   */
  async replaceAllCategories(newCategories: CategoryCreate[]): Promise<Category[]> {
    const oldCategories = await this.api.getCategories();
    const oldCategoryIds = oldCategories.map((category) => category.id);
    const wcCategories = newCategories.map(toWooCommerceCategoryInput);

    await this.api.batchUpdateCategories({
      delete: oldCategoryIds,
    });

    const { create: createdCategories = [] } = await this.api.batchUpdateCategories({
      create: wcCategories,
    });

    return createdCategories.map(fromWooCommerceCategory);
  }

  /**
   * Retrieves a category and all its products by the category's URL slug.
   *
   * @param slug - The URL-friendly identifier for the category
   * @returns Promise resolving to the category and its products if found, null otherwise
   * @throws May throw if there's a network or system error
   */
  async getCategoryWithProducts(slug: string): Promise<CategoryWithProducts | null> {
    const categories = await this.api.getCategories({ slug });
    if (!categories.length) return null;
    const category = categories[0];

    const products = await this.api.getProducts({ category: category.id.toString() });

    return {
      ...fromWooCommerceCategory(category),
      products: products.map(fromWooCommerceProduct),
    };
  }

  /**
   * Retrieves all available categories safely.
   *
   * @returns Promise resolving to an array of categories or an empty array if there's an error
   */
  async getCategoriesSafe(): Promise<Category[]> {
    try {
      return await this.getCategories();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private async getCategories(): Promise<Category[]> {
    const categories = await this.api.getCategories();

    return categories.map(fromWooCommerceCategory);
  }
}
