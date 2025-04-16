import { z } from 'zod';
import { createProduct, Product, ProductCreate } from '@/core/product';
import { Category, CategoryCreate, CategoryWithProducts } from '@/core/category';
import { fromWooCommerceProduct, toWooCommerceProductInput } from '@/services/woocommerce/product';
import {
  fromWooCommerceCategory,
  toWooCommerceCategoryInput,
} from '@/services/woocommerce/category';
import { WooCommerceService } from '@/services/woocommerce';

const productsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    regular_price: z.string(),
    description: z.string(),
    images: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    ),
  }),
);

const categoriesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  }),
);

const productsBatchUpdateSchema = z.object({
  create: productsSchema,
});

const categoriesBatchUpdateSchema = z.object({
  create: categoriesSchema,
});

function parseCategoriesBatchUpdate(result: unknown): Category[] {
  return categoriesBatchUpdateSchema.parse(result).create.map(fromWooCommerceCategory);
}

function parseProducts(result: unknown): Product[] {
  return productsSchema.parse(result).map((product) => {
    const { regular_price, ...rest } = product;

    return createProduct({
      ...rest,
      price: regular_price,
    });
  });
}

function parseProductsBatchUpdate(result: unknown): Product[] {
  return productsBatchUpdateSchema.parse(result).create.map(fromWooCommerceProduct);
}

function parseCategories(result: unknown): Category[] {
  return categoriesSchema.parse(result).map(fromWooCommerceCategory);
}

export class Application {
  private readonly service: WooCommerceService;

  constructor(service: WooCommerceService) {
    this.service = service;
  }

  /**
   * Retrieves a single product by its URL slug.
   *
   * @param slug - The URL-friendly identifier for the product
   * @returns Promise resolving to the product if found, null otherwise
   * @throws May throw if there's a network or system error
   */
  async getProduct(slug: string): Promise<Product | null> {
    const result = await this.service.get('products', { slug });
    const [product] = parseProducts(result);

    return product ?? null;
  }

  /**
   * Retrieves all available products.
   *
   * @returns Promise resolving to an array of products
   * @throws May throw if there's a network or system error
   */
  async getProducts(): Promise<Product[]> {
    const result = await this.service.get('products');

    return parseProducts(result);
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

    const result = await this.service.post('products/batch', {
      delete: oldProductIds,
      create: wcProducts,
    });

    return parseProductsBatchUpdate(result);
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
    const oldCategories = await this.getCategories();
    const oldCategoryIds = oldCategories.map((category) => category.id);
    const wcCategories = newCategories.map(toWooCommerceCategoryInput);

    await this.service.post('products/categories/batch', {
      delete: oldCategoryIds,
    });

    const result = await this.service.post('products/categories/batch', {
      create: wcCategories,
    });

    return parseCategoriesBatchUpdate(result);
  }

  /**
   * Retrieves a category and all its products by the category's URL slug.
   *
   * @param slug - The URL-friendly identifier for the category
   * @returns Promise resolving to the category and its products if found, null otherwise
   * @throws May throw if there's a network or system error
   */
  async getCategoryWithProducts(slug: string): Promise<CategoryWithProducts | null> {
    const result = await this.service.get('products/categories', { slug });
    const [category] = parseCategories(result);

    if (!category) return null;

    const products = await this.service.get('products', { category: category.id.toString() });

    return {
      ...fromWooCommerceCategory(category),
      products: parseProducts(products),
    };
  }

  /**
   * Retrieves all available categories safely.
   *
   * @returns Promise resolving to an array of categories or an empty array if there's an error
   */
  async getCategoriesSafe(): Promise<Category[]> {
    try {
      const result = await this.service.get('products/categories');
      return parseCategories(result);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private async getCategories(): Promise<Category[]> {
    const result = await this.service.get('products/categories');

    return parseCategories(result);
  }
}
