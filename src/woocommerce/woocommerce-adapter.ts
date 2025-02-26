import { Product, NewProduct } from '@/core/product';
import { Application } from '@/core/application';
import { WooCommerceNewProduct } from './woocommerce-new-product';
import { WooCommerceApi } from './woocommerce-api';

export class WooCommerceAdapter implements Application {
  private readonly client: WooCommerceApi;

  constructor(client: WooCommerceApi) {
    this.client = client;
  }

  async getProduct(slug: string): Promise<Product | null> {
    const searchParams = new URLSearchParams({ slug });
    const products = await this.client.fetch<Product[]>({
      endpoint: 'products',
      searchParams,
    });

    return products[0] ?? null;
  }

  async getProducts(): Promise<Product[]> {
    return this.client.fetch<Product[]>({
      endpoint: 'products',
    });
  }

  async replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]> {
    const oldProducts = await this.getProducts();
    const oldProductIds = oldProducts.map((product) => product.id);
    const wcNewProducts = WooCommerceNewProduct.fromDomain(newProducts);

    const response = await this.client.fetch<{ create: Product[] }>({
      method: 'POST',
      endpoint: 'products/batch',
      body: { delete: oldProductIds, create: wcNewProducts },
    });

    return response.create;
  }
}
