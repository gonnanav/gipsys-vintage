// Load environment variables from .env files located in the root project directory
import { loadEnvConfig } from '@next/env';
import * as path from 'path';

const rootProjectDir = path.dirname(process.cwd());
loadEnvConfig(rootProjectDir);

import { defineConfig } from 'cypress';
import { replaceAllProducts, replaceAllCategories } from '@/services';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        'seed:categories': async (newCategories) => {
          return replaceAllCategories(newCategories);
        },
        'seed:products': async (newProducts) => {
          return replaceAllProducts(newProducts);
        },
      });
    },
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
  },
});
