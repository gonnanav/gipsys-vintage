import { Product, NewProduct, ECommercePort, ProductImage } from '@/application';

export class WooCommerceAdapter implements ECommercePort {
  private headers;
  private apiUrl;
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
    this.apiUrl = apiUrl;
    this.productsUrl = productsUrl;
    this.productsBatchUrl = productsBatchUrl;
  }

  async getProduct(slug: string): Promise<Product | null> {
    const searchParams = new URLSearchParams({ slug });
    const productUrl = new URL(`products?${searchParams.toString()}`, this.apiUrl);

    const response = await fetch(productUrl, {
      headers: this.headers,
      cache: 'no-store',
    });

    return response.json().then(([product]) => product ?? null);
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
    const wcNewProducts = WooCommerceNewProduct.fromDomain(newProducts);

    const response = await fetch(this.productsBatchUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ delete: oldProductIds, create: wcNewProducts }),
    });
    const data = await response.json();

    return data.create;
  }
}

class WooCommerceNewProduct {
  name: string;
  regular_price: string;
  description?: string;
  images?: ProductImage[];

  constructor(newProduct: NewProduct) {
    this.name = newProduct.name;
    this.regular_price = newProduct.price;
    this.description = newProduct.description;
    this.images = newProduct.images;
  }

  static fromDomain(products: NewProduct[]): WooCommerceNewProduct[] {
    return products.map((product) => new WooCommerceNewProduct(product));
  }
}
