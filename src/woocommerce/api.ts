import { WCProduct, WCProductBatchUpdate, WCProductBatchUpdateResponse } from './product';
import { WCCategory, WCCategoryBatchUpdate, WCCategoryBatchUpdateResponse } from './category';

interface FetchApi {
  <T>({
    endpoint,
    searchParams,
    body,
  }: {
    endpoint: string;
    searchParams?: Record<string, string>;
    body?: Record<string, unknown>;
  }): Promise<T>;
}

export class WooCommerceApi {
  private readonly get;
  private readonly post;

  constructor(get: FetchApi, post: FetchApi) {
    this.get = get;
    this.post = post;
  }

  async getProducts(searchParams?: Record<string, string>): Promise<WCProduct[]> {
    return this.get({ endpoint: 'products', searchParams });
  }

  async batchUpdateProducts(
    batchUpdate: WCProductBatchUpdate,
  ): Promise<WCProductBatchUpdateResponse> {
    return this.post({ endpoint: 'products/batch', body: batchUpdate as Record<string, unknown> });
  }

  async getCategories(searchParams?: Record<string, string>): Promise<WCCategory[]> {
    return this.get({ endpoint: 'products/categories', searchParams });
  }

  async batchUpdateCategories(
    batchUpdate: WCCategoryBatchUpdate,
  ): Promise<WCCategoryBatchUpdateResponse> {
    return this.post({
      endpoint: 'products/categories/batch',
      body: batchUpdate as Record<string, unknown>,
    });
  }
}
