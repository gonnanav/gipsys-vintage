import { parseEnv } from './env';
import { createWooCommerceService } from './woocommerce';

const env = parseEnv();

export const wcService = createWooCommerceService({
  url: env.WOOCOMMERCE_URL,
  customerKey: env.WOOCOMMERCE_CUSTOMER_KEY,
  customerSecret: env.WOOCOMMERCE_CUSTOMER_SECRET,
});
