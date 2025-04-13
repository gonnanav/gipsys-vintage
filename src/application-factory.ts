import { Application } from './core/application';
import { createWooCommerceApi } from './woocommerce/factory';

export function createApplication(): Application {
  const api = createWooCommerceApi();

  return new Application(api);
}
