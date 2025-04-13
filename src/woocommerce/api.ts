import { WCProduct, WCProductBatchUpdate, WCProductBatchUpdateResponse } from './product';
import { WCCategory, WCCategoryBatchUpdate, WCCategoryBatchUpdateResponse } from './category';

interface WCRequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
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
    return fetchApi<WCProduct[]>(this.apiUrl, 'products', searchParams, {
      headers: this.headers,
    });
  }

  async batchUpdateProducts(
    batchUpdate: WCProductBatchUpdate,
  ): Promise<WCProductBatchUpdateResponse> {
    return fetchApi<WCProductBatchUpdateResponse>(this.apiUrl, 'products/batch', undefined, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(batchUpdate),
    });
  }

  async getCategories(searchParams?: Record<string, string>): Promise<WCCategory[]> {
    return fetchApi<WCCategory[]>(this.apiUrl, 'products/categories', searchParams, {
      headers: this.headers,
    });
  }

  async batchUpdateCategories(
    batchUpdate: WCCategoryBatchUpdate,
  ): Promise<WCCategoryBatchUpdateResponse> {
    return fetchApi<WCCategoryBatchUpdateResponse>(
      this.apiUrl,
      'products/categories/batch',
      undefined,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(batchUpdate),
      },
    );
  }
}

async function fetchApi<T>(
  apiUrl: URL,
  endpoint: string,
  searchParams?: Record<string, string>,
  config?: WCRequestConfig,
): Promise<T> {
  const url = buildEndpointUrl(apiUrl, endpoint, searchParams);

  const response = await fetch(url, {
    cache: 'no-store',
    ...config,
  });

  return response.json();
}

function buildEndpointUrl(
  apiUrl: URL,
  endpoint: string,
  searchParams?: Record<string, string>,
): URL {
  if (!searchParams) return new URL(endpoint, apiUrl);

  const endpointWithParams = `${endpoint}?${new URLSearchParams(searchParams).toString()}`;
  return new URL(endpointWithParams, apiUrl);
}
