import {
  WooCommerceProduct,
  WooCommerceProductBatchUpdate,
  WooCommerceProductBatchUpdateResponse,
} from './product';

export interface WooCommerceApi {
  getProducts(searchParams?: Record<string, string>): Promise<WooCommerceProduct[]>;
  batchUpdateProducts(
    batchUpdate: WooCommerceProductBatchUpdate,
  ): Promise<WooCommerceProductBatchUpdateResponse>;
}
