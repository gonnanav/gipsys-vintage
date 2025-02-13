import { defineConfig } from 'cypress';
import { Application } from '@/application';
import { WooCommerceAdapter } from '@/woocommerce';
import { loadEnvConfig } from '@next/env';
import * as path from 'path';

// Load environment variables from .env files located in the root project directory
const rootProjectDir = path.dirname(process.cwd());
loadEnvConfig(rootProjectDir);

const wcUrl = process.env['WOOCOMMERCE_URL'];
const wcCustomerKey = process.env['WOOCOMMERCE_CUSTOMER_KEY'];
const wcCustomerSecret = process.env['WOOCOMMERCE_CUSTOMER_SECRET'];

if (!wcUrl || !wcCustomerKey || !wcCustomerSecret) {
  throw new Error('Missing WooCommerece environment variables');
}

const wc = new WooCommerceAdapter(wcUrl, wcCustomerKey, wcCustomerSecret);
const app = new Application(wc);

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        'seed:products': async (newProducts) => {
          return app.replaceAllProducts(newProducts);
        },
      });
    },
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
  },
});
