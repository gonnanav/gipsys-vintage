import { defineConfig } from 'cypress';
import './envConfig.ts';
import { wcUrl, wcCustomerKey, wcCustomerSecret } from './lib/config';

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
          const productsResponse = await fetch(
            `${wcUrl}/wp-json/wc/v3/products`,
            {
              headers,
            },
          );
          const json = await productsResponse.json();
          const productIds = json.map((product: any) => product.id);

          const deleteRequest = await fetch(
            `${wcUrl}/wp-json/wc/v3/products/batch`,
            {
              method: 'POST',
              headers,
              body: JSON.stringify({ delete: productIds }),
            },
          );
          const deleteJson = await deleteRequest.json();

          return null;
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
