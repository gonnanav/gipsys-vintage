import { defineConfig } from 'cypress';
import { Application } from '@/application';
import { wcUrl, wcCustomerKey, wcCustomerSecret } from '@/config';
import { WooCommerceAdapter } from '@/woocommerce';

const wc = new WooCommerceAdapter(wcUrl, wcCustomerKey, wcCustomerSecret);
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
