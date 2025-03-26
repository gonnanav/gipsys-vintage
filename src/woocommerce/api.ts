import {
  WooCommerceProduct,
  WooCommerceProductBatchUpdate,
  WooCommerceProductBatchUpdateResponse,
} from './product';
import {
  WooCommerceCategory,
  WooCommerceCategoryBatchUpdate,
  WooCommerceCategoryBatchUpdateResponse,
} from './category';

interface WooCommerceRequestConfig {
  method?: string;
  searchParams?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
}

export class WooCommerceApi {
  private readonly headers: Record<string, string>;
  private readonly apiUrl: URL;

  constructor(url: string, customerKey: string, customerSecret: string) {
    const credentials = Buffer.from(`${customerKey}:${customerSecret}`).toString('base64');

    this.headers = {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    };

    this.apiUrl = new URL('wp-json/wc/v3/', url);
  }

  private async fetch<T>(endpoint: string, config?: WooCommerceRequestConfig): Promise<T> {
    const { method = 'GET', searchParams, body, cache = 'no-store' } = config ?? {};

    let url = new URL(endpoint, this.apiUrl);
    if (searchParams) {
      url = new URL(`${endpoint}?${new URLSearchParams(searchParams).toString()}`, this.apiUrl);
    }

    const response = await fetch(url, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
      cache,
    });

    return response.json();
  }

  async getProducts(searchParams?: Record<string, string>): Promise<WooCommerceProduct[]> {
    return this.fetch<WooCommerceProduct[]>('products', { searchParams });
  }

  async batchUpdateProducts(
    batchUpdate: WooCommerceProductBatchUpdate,
  ): Promise<WooCommerceProductBatchUpdateResponse> {
    return this.fetch<WooCommerceProductBatchUpdateResponse>('products/batch', {
      method: 'POST',
      body: batchUpdate,
    });
  }

  async getCategories(searchParams?: Record<string, string>): Promise<WooCommerceCategory[]> {
    return this.fetch<WooCommerceCategory[]>('products/categories', { searchParams });
  }

  async batchUpdateCategories(
    batchUpdate: WooCommerceCategoryBatchUpdate,
  ): Promise<WooCommerceCategoryBatchUpdateResponse> {
    return this.fetch<WooCommerceCategoryBatchUpdateResponse>('products/categories/batch', {
      method: 'POST',
      body: batchUpdate,
    });
  }
}
