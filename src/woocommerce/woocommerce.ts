import { Application, Product, NewProduct } from '@/application';
import { WooCommerceNewProduct } from './woocommerce-new-product';
import { WooCommerceClient } from './woocommerce-client';

export class WooCommerceAdapter implements Application {
  private readonly client: WooCommerceClient;

  constructor(url: string, customerKey: string, customerSecret: string) {
    this.client = new WooCommerceClient(url, customerKey, customerSecret);
  }

  async getProduct(slug: string): Promise<Product | null> {
    const searchParams = new URLSearchParams({ slug });
    const response = await this.client.fetch<Product[]>({
      endpoint: 'products',
      searchParams,
    });
    return response[0] ?? null;
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
