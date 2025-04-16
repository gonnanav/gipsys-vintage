import { Application } from './application';
import { parseEnv } from './env';
import { createWooCommerceService } from '@/services/woocommerce';

export function createApplication(): Application {
  const env = parseEnv();
  const wcService = createWooCommerceService({
    url: env.WOOCOMMERCE_URL,
    customerKey: env.WOOCOMMERCE_CUSTOMER_KEY,
    customerSecret: env.WOOCOMMERCE_CUSTOMER_SECRET,
  });

  return new Application(wcService);
}
