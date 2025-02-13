import { defineConfig } from 'cypress';
import { loadEnvConfig } from '@next/env';
import * as path from 'path';
import { createApplication } from '@/composition-root';

// Load environment variables from .env files located in the root project directory
const rootProjectDir = path.dirname(process.cwd());
loadEnvConfig(rootProjectDir);

const app = createApplication();

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
