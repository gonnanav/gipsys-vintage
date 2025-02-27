import { Application } from './core/application';
import { WooCommerceAdapter } from './woocommerce/adapter';
import { WooCommerceClient } from './woocommerce/client';

export function createApplication(): Application {
  const wcUrl = getRequiredEnv('WOOCOMMERCE_URL');
  const wcCustomerKey = getRequiredEnv('WOOCOMMERCE_CUSTOMER_KEY');
  const wcCustomerSecret = getRequiredEnv('WOOCOMMERCE_CUSTOMER_SECRET');
  const wcClient = new WooCommerceClient(wcUrl, wcCustomerKey, wcCustomerSecret);

  return new WooCommerceAdapter(wcClient);
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}
