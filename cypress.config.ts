import { defineConfig } from 'cypress';
import { createProducts, deleteProducts, getProducts } from '@/application';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        'reset:products': async () => {
          const products = await getProducts();
          const productIds = products.map((product) => product.id);

          return deleteProducts(productIds);
        },
        'seed:products': async (products) => {
          return createProducts(products);
        },
      });
    },
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
  },
});
