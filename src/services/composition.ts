import { parseEnv } from './env';
import { createWooCommerceService } from './woocommerce';
import { createApplication } from './application';

const env = parseEnv();

export const wcService = createWooCommerceService({
  url: env.WOOCOMMERCE_URL,
  customerKey: env.WOOCOMMERCE_CUSTOMER_KEY,
  customerSecret: env.WOOCOMMERCE_CUSTOMER_SECRET,
});

export const { replaceAllProducts, replaceAllCategories } = createApplication(wcService);
