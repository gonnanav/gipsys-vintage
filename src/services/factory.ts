import { Application } from '@/core/application';
import { createWooCommerceService, WooCommerceApi } from '@/woocommerce';

export function createApplication(): Application {
  const wcService = createWooCommerceService();
  const wcApi = new WooCommerceApi(wcService);

  return new Application(wcApi);
}
