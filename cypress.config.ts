import { defineConfig } from 'cypress';
import '@/envConfig';
import { wcUrl, wcCustomerKey, wcCustomerSecret } from '@/lib/config';
import { deleteProducts, getProducts } from '@/lib/services/product-service';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const credentials = Buffer.from(
        `${wcCustomerKey}:${wcCustomerSecret}`,
      ).toString('base64');

      const headers = {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      };

      on('task', {
        'reset:products': async () => {
          const products = await getProducts();
          const productIds = products.map((product: any) => product.id);

          return deleteProducts(productIds);
        },
        'seed:products': async (products) => {
          const createResponse = await fetch(
            `${wcUrl}/wp-json/wc/v3/products/batch`,
            {
              method: 'POST',
              headers,
              body: JSON.stringify({ create: products }),
            },
          );

          return null;
        },
      });
    },
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
  },
});
