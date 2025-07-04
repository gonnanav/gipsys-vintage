import { z } from 'zod';

const schema = z.object({
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

export function parseEnv() {
  return schema.parse(process.env);
}
