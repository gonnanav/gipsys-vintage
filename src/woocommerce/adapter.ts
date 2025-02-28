import { Product, ProductCreate } from '@/core/product';
import { Application } from '@/core/application';
import { WooCommerceProduct, WooCommerceProductInput } from './product';
import { WooCommerceApi } from './api';

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
}

function fromWooCommerceProduct(product: WooCommerceProduct): Product {
  const { regular_price, ...rest } = product;

  return {
    ...rest,
    price: regular_price,
  };
}

function toWooCommerceProductInput(product: ProductCreate): WooCommerceProductInput {
  const { price, ...rest } = product;

  return {
    ...rest,
    regular_price: price,
  };
}
