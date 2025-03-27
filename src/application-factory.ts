import { z } from 'zod';
import { Application } from './core/application';
import { WooCommerceAdapter } from './woocommerce/adapter';
import { WooCommerceApi } from './woocommerce/api';

const envSchema = z.object({
  WOOCOMMERCE_URL: z
    .string({ message: 'WooCommerce URL is required' })
    .url({ message: 'Invalid WooCommerce URL' }),
  WOOCOMMERCE_CUSTOMER_KEY: z
    .string({ message: 'WooCommerce customer key is required' })
    .min(1, { message: 'Empty WooCommerce customer key' }),
  WOOCOMMERCE_CUSTOMER_SECRET: z
    .string({ message: 'WooCommerce customer secret is required' })
    .min(1, { message: 'Empty WooCommerce customer secret' }),
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
