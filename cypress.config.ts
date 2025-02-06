import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const customerKey = config.env['WC_CUSTOMER_KEY'];
      if (!customerKey) {
        throw new Error('Missing WooCommerce customer key');
      }

      const customerSecret = config.env['WC_CUSTOMER_SECRET'];
      if (!customerSecret) {
        throw new Error('Missing WooCommerce customer secret');
      }

      const credentials = Buffer.from(
        `${customerKey}:${customerSecret}`,
      ).toString('base64');

      const headers = {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      };

      on('task', {
        'reset:products': async () => {
          const productsResponse = await fetch(
            'https://gipsys-vintage.local/wp-json/wc/v3/products',
            {
              headers,
            },
          );
          const json = await productsResponse.json();
          const productIds = json.map((product: any) => product.id);

          const deleteRequest = await fetch(
            'https://gipsys-vintage.local/wp-json/wc/v3/products/batch',
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
            'https://gipsys-vintage.local/wp-json/wc/v3/products/batch',
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
