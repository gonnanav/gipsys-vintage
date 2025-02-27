import { Product, NewProduct } from '@/core/product';
import { Application } from '@/core/application';
import { toWooCommerceProductInput } from './product';
import { WooCommerceApi } from './api';

export class WooCommerceAdapter implements Application {
  private readonly api: WooCommerceApi;

  constructor(api: WooCommerceApi) {
    this.api = api;
  }

  async getProduct(slug: string): Promise<Product | null> {
    const products = await this.api.fetch<Product[]>('products', {
      searchParams: { slug },
    });

    return products[0] ?? null;
  }

  async getProducts(): Promise<Product[]> {
    return this.api.fetch<Product[]>('products');
  }

  async replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]> {
    const oldProducts = await this.getProducts();
    const oldProductIds = oldProducts.map((product) => product.id);
    const wcProducts = newProducts.map(toWooCommerceProductInput);

    const response = await this.api.fetch<{ create: Product[] }>('products/batch', {
      method: 'POST',
      body: { delete: oldProductIds, create: wcProducts },
    });

    return response.create;
  }
}
