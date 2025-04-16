import { defineConfig } from 'cypress';
import { loadEnvConfig } from '@next/env';
import * as path from 'path';
import { createApplication } from '@/services/factory';
import { parseEnv } from '@/services/env';

// Load environment variables from .env files located in the root project directory
const rootProjectDir = path.dirname(process.cwd());
loadEnvConfig(rootProjectDir);

const env = parseEnv();
const app = createApplication({
  woocommerceUrl: env.WOOCOMMERCE_URL,
  woocommerceCustomerKey: env.WOOCOMMERCE_CUSTOMER_KEY,
  woocommerceCustomerSecret: env.WOOCOMMERCE_CUSTOMER_SECRET,
});

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        'seed:categories': async (newCategories) => {
          return app.replaceAllCategories(newCategories);
        },
        'seed:products': async (newProducts) => {
          return app.replaceAllProducts(newProducts);
        },
      });
    },
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
  },
});
