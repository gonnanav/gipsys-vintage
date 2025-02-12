import { defineConfig } from 'cypress';
import { Application } from '@/application';
import * as wc from '@/woocommerce';

const app = new Application(wc);

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        'seed:products': async (newProducts) => {
          return app.replaceAllProducts(newProducts);
        },
      });
    },
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
  },
});
