import { Product, NewProduct, ECommercePort } from '@/application';

export class WooCommerceAdapter implements ECommercePort {
  private headers;
  private productsUrl;
  private productsBatchUrl;

  constructor(url: string, customerKey: string, customerSecret: string) {
    const credentials = Buffer.from(`${customerKey}:${customerSecret}`).toString('base64');

    const headers = {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    };

    const apiUrl = new URL('wp-json/wc/v3/', url);
    const productsUrl = new URL('products/', apiUrl);
    const productsBatchUrl = new URL('batch/', productsUrl);

    this.headers = headers;
    this.productsUrl = productsUrl;
    this.productsBatchUrl = productsBatchUrl;
  }

  async getProducts(): Promise<Product[]> {
    const response = await fetch(this.productsUrl, {
      headers: this.headers,
      cache: 'no-store',
    });

    return response.json();
  }

  async replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]> {
    const oldProducts = await this.getProducts();
    const oldProductIds = oldProducts.map((product) => product.id);

    const response = await fetch(this.productsBatchUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ delete: oldProductIds, create: newProducts }),
    });
    const data = await response.json();

    return data.create;
  }
}
