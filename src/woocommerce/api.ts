import { WCProduct, WCProductBatchUpdate, WCProductBatchUpdateResponse } from './product';
import { WCCategory, WCCategoryBatchUpdate, WCCategoryBatchUpdateResponse } from './category';

export class WooCommerceApi {
  private readonly headers: Record<string, string>;
  private readonly fetchApi;

  constructor(apiUrl: URL, credentials: string) {
    this.headers = {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    };

    this.fetchApi = createFetchApi(apiUrl);
  }

  async getProducts(searchParams?: Record<string, string>): Promise<WCProduct[]> {
    return this.fetchApi<WCProduct[]>(
      { endpoint: 'products', searchParams },
      {
        headers: this.headers,
      },
    );
  }

  async batchUpdateProducts(
    batchUpdate: WCProductBatchUpdate,
  ): Promise<WCProductBatchUpdateResponse> {
    return this.fetchApi<WCProductBatchUpdateResponse>(
      { endpoint: 'products/batch' },
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(batchUpdate),
      },
    );
  }

  async getCategories(searchParams?: Record<string, string>): Promise<WCCategory[]> {
    return this.fetchApi<WCCategory[]>(
      { endpoint: 'products/categories', searchParams },
      {
        headers: this.headers,
      },
    );
  }

  async batchUpdateCategories(
    batchUpdate: WCCategoryBatchUpdate,
  ): Promise<WCCategoryBatchUpdateResponse> {
    return this.fetchApi<WCCategoryBatchUpdateResponse>(
      { endpoint: 'products/categories/batch' },
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(batchUpdate),
      },
    );
  }
}

function createFetchApi(apiUrl: URL) {
  return async function fetchApi<T>(
    { endpoint, searchParams }: { endpoint: string; searchParams?: Record<string, string> },
    init?: RequestInit,
  ): Promise<T> {
    const url = buildEndpointUrl(apiUrl, endpoint, searchParams);

    const response = await fetch(url, {
      cache: 'no-store',
      ...init,
    });

    return response.json();
  };
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
