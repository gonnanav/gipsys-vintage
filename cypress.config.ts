import { defineConfig } from 'cypress';
import 'envConfig';
import {
  createProducts,
  deleteProducts,
  getProducts,
} from '@/services/product-service';

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
