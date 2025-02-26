import { Application } from './application';
import { WooCommerceAdapter } from './woocommerce/woocommerce';

export function createApplication(): Application {
  const wcUrl = getRequiredEnv('WOOCOMMERCE_URL');
  const wcCustomerKey = getRequiredEnv('WOOCOMMERCE_CUSTOMER_KEY');
  const wcCustomerSecret = getRequiredEnv('WOOCOMMERCE_CUSTOMER_SECRET');

  return new WooCommerceAdapter(wcUrl, wcCustomerKey, wcCustomerSecret);
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}
