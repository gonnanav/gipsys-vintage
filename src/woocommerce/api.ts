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

export interface WooCommerceApi {
  getProducts(searchParams?: Record<string, string>): Promise<WooCommerceProduct[]>;
  batchUpdateProducts(
    batchUpdate: WooCommerceProductBatchUpdate,
  ): Promise<WooCommerceProductBatchUpdateResponse>;

  getCategories(searchParams?: Record<string, string>): Promise<WooCommerceCategory[]>;
  batchUpdateCategories(
    batchUpdate: WooCommerceCategoryBatchUpdate,
  ): Promise<WooCommerceCategoryBatchUpdateResponse>;
}
