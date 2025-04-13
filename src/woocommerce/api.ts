import { WCProduct, WCProductBatchUpdate, WCProductBatchUpdateResponse } from './product';
import { WCCategory, WCCategoryBatchUpdate, WCCategoryBatchUpdateResponse } from './category';

interface FetchApi {
  <T>(
    {
      endpoint,
      searchParams,
    }: {
      endpoint: string;
      searchParams?: Record<string, string>;
    },
    init?: RequestInit,
  ): Promise<T>;
}

export class WooCommerceApi {
  private readonly fetchApi;

  constructor(fetchApi: FetchApi) {
    this.fetchApi = fetchApi;
  }

  async getProducts(searchParams?: Record<string, string>): Promise<WCProduct[]> {
    return this.fetchApi<WCProduct[]>({ endpoint: 'products', searchParams });
  }

  async batchUpdateProducts(
    batchUpdate: WCProductBatchUpdate,
  ): Promise<WCProductBatchUpdateResponse> {
    return this.fetchApi<WCProductBatchUpdateResponse>(
      { endpoint: 'products/batch' },
      {
        method: 'POST',
        body: JSON.stringify(batchUpdate),
      },
    );
  }

  async getCategories(searchParams?: Record<string, string>): Promise<WCCategory[]> {
    return this.fetchApi<WCCategory[]>({ endpoint: 'products/categories', searchParams });
  }

  async batchUpdateCategories(
    batchUpdate: WCCategoryBatchUpdate,
  ): Promise<WCCategoryBatchUpdateResponse> {
    return this.fetchApi<WCCategoryBatchUpdateResponse>(
      { endpoint: 'products/categories/batch' },
      {
        method: 'POST',
        body: JSON.stringify(batchUpdate),
      },
    );
  }
}
