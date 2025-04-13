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

  constructor(apiUrl: URL, credentials: string) {
    this.headers = {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    };

    this.apiUrl = apiUrl;
  }

  async getProducts(searchParams?: Record<string, string>): Promise<WCProduct[]> {
    return fetchApi<WCProduct[]>('products', this.apiUrl, this.headers, { searchParams });
  }

  async batchUpdateProducts(
    batchUpdate: WCProductBatchUpdate,
  ): Promise<WCProductBatchUpdateResponse> {
    return fetchApi<WCProductBatchUpdateResponse>('products/batch', this.apiUrl, this.headers, {
      method: 'POST',
      body: batchUpdate,
    });
  }

  async getCategories(searchParams?: Record<string, string>): Promise<WCCategory[]> {
    return fetchApi<WCCategory[]>('products/categories', this.apiUrl, this.headers, {
      searchParams,
    });
  }

  async batchUpdateCategories(
    batchUpdate: WCCategoryBatchUpdate,
  ): Promise<WCCategoryBatchUpdateResponse> {
    return fetchApi<WCCategoryBatchUpdateResponse>(
      'products/categories/batch',
      this.apiUrl,
      this.headers,
      {
        method: 'POST',
        body: batchUpdate,
      },
    );
  }
}

async function fetchApi<T>(
  endpoint: string,
  apiUrl: URL,
  headers: Record<string, string>,
  config?: WCRequestConfig,
): Promise<T> {
  const { method = 'GET', searchParams, body, cache = 'no-store' } = config ?? {};

  let url = new URL(endpoint, apiUrl);
  if (searchParams) {
    url = new URL(`${endpoint}?${new URLSearchParams(searchParams).toString()}`, apiUrl);
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache,
  });

  return response.json();
}
