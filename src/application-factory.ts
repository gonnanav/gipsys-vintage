import { z } from 'zod';
import { Application } from './core/application';
import { WooCommerceAdapter } from './woocommerce/adapter';
import { WooCommerceApi } from './woocommerce/api';

const envSchema = z.object({
  WOOCOMMERCE_URL: z.string().min(1, 'WooCommerce URL is required').url('Invalid WooCommerce URL'),
  WOOCOMMERCE_CUSTOMER_KEY: z.string().min(1, 'WooCommerce Customer Key is required'),
  WOOCOMMERCE_CUSTOMER_SECRET: z.string().min(1, 'WooCommerce Customer Secret is required'),
});

/**
 * Creates an application instance using environment variables for configuration.
 * @returns Application instance
 * @throws Error if required environment variables are missing or invalid
 */
export function createApplication(): Application {
  const envData = envSchema.parse(process.env);
  const wcClient = new WooCommerceApi(
    envData.WOOCOMMERCE_URL,
    envData.WOOCOMMERCE_CUSTOMER_KEY,
    envData.WOOCOMMERCE_CUSTOMER_SECRET,
  );

  return new WooCommerceAdapter(wcClient);
}
