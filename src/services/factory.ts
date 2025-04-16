import { Application } from './application';
import { createWooCommerceService } from '@/services/woocommerce';

export function createApplication({
  woocommerceUrl,
  woocommerceCustomerKey,
  woocommerceCustomerSecret,
}: {
  woocommerceUrl: string;
  woocommerceCustomerKey: string;
  woocommerceCustomerSecret: string;
}): Application {
  const wcService = createWooCommerceService({
    url: woocommerceUrl,
    customerKey: woocommerceCustomerKey,
    customerSecret: woocommerceCustomerSecret,
  });

  return new Application(wcService);
}
