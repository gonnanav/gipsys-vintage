import { defineConfig } from 'cypress';
import { replaceAllProducts } from '@/application';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        'seed:products': async (newProducts) => {
          return replaceAllProducts(newProducts);
        },
      });
    },
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
  },
});
