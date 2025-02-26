import { WooCommerceAdapter } from './woocommerce/woocommerce';
import { Application } from './application';

export function createApplication(): Application {
  const wcUrl = getRequiredEnv('WOOCOMMERCE_URL');
  const wcCustomerKey = getRequiredEnv('WOOCOMMERCE_CUSTOMER_KEY');
  const wcCustomerSecret = getRequiredEnv('WOOCOMMERCE_CUSTOMER_SECRET');

  const wc = new WooCommerceAdapter(wcUrl, wcCustomerKey, wcCustomerSecret);
  const app = new Application(wc);

  return app;
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}
