import { z } from 'zod';

interface WCConfig {
  url: string;
  customerKey: string;
  customerSecret: string;
}

export function parseEnv(): WCConfig {
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
  const data = schema.parse(process.env);

  return {
    url: data.WOOCOMMERCE_URL,
    customerKey: data.WOOCOMMERCE_CUSTOMER_KEY,
    customerSecret: data.WOOCOMMERCE_CUSTOMER_SECRET,
  };
}
