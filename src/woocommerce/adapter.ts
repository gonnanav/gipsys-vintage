import { Product, ProductCreate } from '@/core/product';
import { Category, CategoryCreate, CategoryWithProducts } from '@/core/category';
import { Application } from '@/core/application';
import { WooCommerceApi } from './api';
import { fromWooCommerceProduct, toWooCommerceProductInput } from './product';
import { fromWooCommerceCategory, toWooCommerceCategoryInput } from './category';

export class WooCommerceAdapter implements Application {
  private readonly api: WooCommerceApi;

  constructor(api: WooCommerceApi) {
    this.api = api;
  }

  async getProduct(slug: string): Promise<Product | null> {
    const wcProducts = await this.api.getProducts({ slug });

    if (!wcProducts || wcProducts.length === 0) return null;

    return fromWooCommerceProduct(wcProducts[0]);
  }

  async getProducts(): Promise<Product[]> {
    const wcProducts = await this.api.getProducts();

    return wcProducts.map(fromWooCommerceProduct);
  }

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

  private async getCategories(): Promise<Category[]> {
    const categories = await this.api.getCategories();

    return categories.map(fromWooCommerceCategory);
  }

  async getCategoriesSafe(): Promise<Category[]> {
    try {
      return await this.getCategories();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
