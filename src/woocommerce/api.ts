import { WCProduct, WCProductBatchUpdate, WCProductBatchUpdateResponse } from './product';
import { WCCategory, WCCategoryBatchUpdate, WCCategoryBatchUpdateResponse } from './category';
import { WooCommerceService } from './factory';

export class WooCommerceApi {
  private readonly service;

  constructor(service: WooCommerceService) {
    this.service = service;
  }

  async getProducts(searchParams?: Record<string, string>): Promise<WCProduct[]> {
    return this.service.get('products', searchParams);
  }

  async batchUpdateProducts(
    batchUpdate: WCProductBatchUpdate,
  ): Promise<WCProductBatchUpdateResponse> {
    return this.service.post('products/batch', batchUpdate as Record<string, unknown>);
  }

  async getCategories(searchParams?: Record<string, string>): Promise<WCCategory[]> {
    return this.service.get('products/categories', searchParams);
  }

  async batchUpdateCategories(
    batchUpdate: WCCategoryBatchUpdate,
  ): Promise<WCCategoryBatchUpdateResponse> {
    return this.service.post('products/categories/batch', batchUpdate as Record<string, unknown>);
  }
}
