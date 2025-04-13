import { WCProduct, WCProductBatchUpdate, WCProductBatchUpdateResponse } from './product';
import { WCCategory, WCCategoryBatchUpdate, WCCategoryBatchUpdateResponse } from './category';

interface WCRequestConfig {
  method?: string;
  searchParams?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
}

export class WooCommerceApi {
  private readonly headers: Record<string, string>;
  private readonly apiUrl: URL;

  constructor(url: string, credentials: string) {
    this.headers = {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    };

    this.apiUrl = new URL('wp-json/wc/v3/', url);
  }

  private async fetch<T>(endpoint: string, config?: WCRequestConfig): Promise<T> {
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

  async getProducts(searchParams?: Record<string, string>): Promise<WCProduct[]> {
    return this.fetch<WCProduct[]>('products', { searchParams });
  }

  async batchUpdateProducts(
    batchUpdate: WCProductBatchUpdate,
  ): Promise<WCProductBatchUpdateResponse> {
    return this.fetch<WCProductBatchUpdateResponse>('products/batch', {
      method: 'POST',
      body: batchUpdate,
    });
  }

  async getCategories(searchParams?: Record<string, string>): Promise<WCCategory[]> {
    return this.fetch<WCCategory[]>('products/categories', { searchParams });
  }

  async batchUpdateCategories(
    batchUpdate: WCCategoryBatchUpdate,
  ): Promise<WCCategoryBatchUpdateResponse> {
    return this.fetch<WCCategoryBatchUpdateResponse>('products/categories/batch', {
      method: 'POST',
      body: batchUpdate,
    });
  }
}
