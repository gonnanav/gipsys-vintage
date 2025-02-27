import { Product, NewProduct } from '@/core/product';
import { Application } from '@/core/application';
import { WooCommerceNewProduct } from './product';
import { WooCommerceApi } from './api';

export class WooCommerceAdapter implements Application {
  private readonly api: WooCommerceApi;

  constructor(api: WooCommerceApi) {
    this.api = api;
  }

  async getProduct(slug: string): Promise<Product | null> {
    const searchParams = new URLSearchParams({ slug });
    const products = await this.api.fetch<Product[]>('products', {
      searchParams,
    });

    return products[0] ?? null;
  }

  async getProducts(): Promise<Product[]> {
    return this.api.fetch<Product[]>('products');
  }

  async replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]> {
    const oldProducts = await this.getProducts();
    const oldProductIds = oldProducts.map((product) => product.id);
    const wcNewProducts = WooCommerceNewProduct.fromDomain(newProducts);

    const response = await this.api.fetch<{ create: Product[] }>('products/batch', {
      method: 'POST',
      body: { delete: oldProductIds, create: wcNewProducts },
    });

    return response.create;
  }
}
