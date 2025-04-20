import { Product, ProductCreate } from '@/core/product';
import { Category, CategoryCreate, CategoryWithProducts } from '@/core/category';
import {
  parseProducts,
  parseProductsBatchUpdate,
  toWooCommerceProductInput,
  fromWooCommerceProduct,
} from './woocommerce/product';
import { parseCategories, parseCategoriesBatchUpdate } from './woocommerce/category';
import { WooCommerceService } from './woocommerce';

export function createApplication(service: WooCommerceService) {
  async function getProduct(slug: string): Promise<Product | null> {
    const result = await service.get('products', { slug });
    const wcProducts = parseProducts(result);
    const products = wcProducts.map(fromWooCommerceProduct);

    return products[0] ?? null;
  }

  async function getProducts(): Promise<Product[]> {
    const result = await service.get('products');
    const wcProducts = parseProducts(result);
    const products = wcProducts.map(fromWooCommerceProduct);

    return products;
  }

  async function replaceAllProducts(newProducts: ProductCreate[]): Promise<Product[]> {
    const oldProducts = await getProducts();
    const oldProductIds = oldProducts.map((product) => product.id);
    const wcProducts = newProducts.map(toWooCommerceProductInput);

    const result = await service.post('products/batch', {
      delete: oldProductIds,
      create: wcProducts,
    });

    const wcProductsBatchUpdate = parseProductsBatchUpdate(result);

    return wcProductsBatchUpdate.create.map(fromWooCommerceProduct);
  }

  async function replaceAllCategories(newCategories: CategoryCreate[]): Promise<Category[]> {
    const oldCategories = await getCategories();
    const oldCategoryIds = oldCategories.map((category) => category.id);

    await service.post('products/categories/batch', {
      delete: oldCategoryIds,
    });

    const result = await service.post('products/categories/batch', {
      create: newCategories,
    });

    return parseCategoriesBatchUpdate(result).create;
  }

  async function getCategoryWithProducts(slug: string): Promise<CategoryWithProducts | null> {
    const result = await service.get('products/categories', { slug });
    const wcCategories = parseCategories(result);
    const category = wcCategories[0];

    if (!category) return null;

    const rawProducts = await service.get('products', { category: category.id.toString() });
    const wcProducts = parseProducts(rawProducts);
    const products = wcProducts.map(fromWooCommerceProduct);

    return { ...category, products };
  }

  async function getCategoriesSafe(): Promise<Category[]> {
    try {
      return getCategories();
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
