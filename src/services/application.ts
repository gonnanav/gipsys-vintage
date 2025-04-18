import { Product, ProductCreate } from '@/core/product';
import { Category, CategoryCreate, CategoryWithProducts } from '@/core/category';
import {
  parseProducts,
  parseProductsBatchUpdate,
  toWooCommerceProductInput,
} from './woocommerce/product';
import {
  parseCategories,
  parseCategoriesBatchUpdate,
  fromWooCommerceCategory,
  toWooCommerceCategoryInput,
} from './woocommerce/category';
import { WooCommerceService } from './woocommerce';

export function createApplication(service: WooCommerceService) {
  async function getProduct(slug: string): Promise<Product | null> {
    const result = await service.get('products', { slug });
    const [product] = parseProducts(result);

    return product ?? null;
  }

  async function getProducts(): Promise<Product[]> {
    const result = await service.get('products');

    return parseProducts(result);
  }

  async function replaceAllProducts(newProducts: ProductCreate[]): Promise<Product[]> {
    const oldProducts = await getProducts();
    const oldProductIds = oldProducts.map((product) => product.id);
    const wcProducts = newProducts.map(toWooCommerceProductInput);

    const result = await service.post('products/batch', {
      delete: oldProductIds,
      create: wcProducts,
    });

    return parseProductsBatchUpdate(result);
  }

  async function replaceAllCategories(newCategories: CategoryCreate[]): Promise<Category[]> {
    const oldCategories = await getCategories();
    const oldCategoryIds = oldCategories.map((category) => category.id);
    const wcCategories = newCategories.map(toWooCommerceCategoryInput);

    await service.post('products/categories/batch', {
      delete: oldCategoryIds,
    });

    const result = await service.post('products/categories/batch', {
      create: wcCategories,
    });

    return parseCategoriesBatchUpdate(result);
  }

  async function getCategoryWithProducts(slug: string): Promise<CategoryWithProducts | null> {
    const result = await service.get('products/categories', { slug });
    const [category] = parseCategories(result);

    if (!category) return null;

    const products = await service.get('products', { category: category.id.toString() });

    return {
      ...fromWooCommerceCategory(category),
      products: parseProducts(products),
    };
  }

  async function getCategoriesSafe(): Promise<Category[]> {
    try {
      const result = await service.get('products/categories');
      return parseCategories(result);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function getCategories(): Promise<Category[]> {
    const result = await service.get('products/categories');

    return parseCategories(result);
  }

  return {
    getProducts,
    getProduct,
    getCategoryWithProducts,
    getCategoriesSafe,
    replaceAllProducts,
    replaceAllCategories,
  };
}
