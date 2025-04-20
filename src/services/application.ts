import { Product, ProductCreate } from '@/core/product';
import { Category, CategoryCreate } from '@/core/category';
import {
  parseProducts,
  parseProductsBatchUpdate,
  toWooCommerceProductInput,
  fromWooCommerceProduct,
} from './woocommerce/product';
import { parseCategories, parseCategoriesBatchUpdate } from './woocommerce/category';
import { WooCommerceService } from './woocommerce';

export function createApplication(service: WooCommerceService) {
  async function getProducts(): Promise<Product[]> {
    const rawProducts = await service.get('products');
    const wcProducts = parseProducts(rawProducts);
    const products = wcProducts.map(fromWooCommerceProduct);

    return products;
  }

  async function replaceAllProducts(newProducts: ProductCreate[]): Promise<Product[]> {
    const oldProducts = await getProducts();
    const oldProductIds = oldProducts.map((product) => product.id);
    const wcProductInputs = newProducts.map(toWooCommerceProductInput);

    const rawBatchResponse = await service.post('products/batch', {
      delete: oldProductIds,
      create: wcProductInputs,
    });

    const wcBatchResponse = parseProductsBatchUpdate(rawBatchResponse);

    return wcBatchResponse.create.map(fromWooCommerceProduct);
  }

  async function replaceAllCategories(newCategories: CategoryCreate[]): Promise<Category[]> {
    const oldCategories = await getCategories();
    const oldCategoryIds = oldCategories.map((category) => category.id);

    await service.post('products/categories/batch', {
      delete: oldCategoryIds,
    });

    const rawBatchResponse = await service.post('products/categories/batch', {
      create: newCategories,
    });
    const wcBatchResponse = parseCategoriesBatchUpdate(rawBatchResponse);

    return wcBatchResponse.create;
  }

  async function getCategories(): Promise<Category[]> {
    const rawCategories = await service.get('products/categories');

    return parseCategories(rawCategories);
  }

  return {
    getProducts,
    replaceAllProducts,
    replaceAllCategories,
  };
}
