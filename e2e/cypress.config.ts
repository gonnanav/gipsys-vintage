// Load environment variables from .env files located in the root project directory
import { loadEnvConfig } from '@next/env';
import * as path from 'path';

const rootProjectDir = path.dirname(process.cwd());
loadEnvConfig(rootProjectDir);

import { defineConfig } from 'cypress';
import {
  wcService,
  fromWooCommerceProduct,
  parseProducts,
  parseProductsBatchUpdate,
  parseCategories,
  parseCategoriesBatchUpdate,
  toWooCommerceProductInput,
} from '@/services';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        'seed:categories': async (newCategories) => {
          const rawCategories = await wcService.get('products/categories');
          const wcOldCategories = parseCategories(rawCategories);
          const oldCategoryIds = wcOldCategories.map((category) => category.id);

          await wcService.post('products/categories/batch', {
            delete: oldCategoryIds,
          });

          const rawBatchResponse = await wcService.post('products/categories/batch', {
            create: newCategories,
          });
          const wcBatchResponse = parseCategoriesBatchUpdate(rawBatchResponse);

          return wcBatchResponse.create;
        },
        'seed:products': async (newProducts) => {
          const rawProducts = await wcService.get('products');
          const wcProducts = parseProducts(rawProducts);
          const oldProductIds = wcProducts.map((product) => product.id);
          const wcProductInputs = newProducts.map(toWooCommerceProductInput);

          const rawBatchResponse = await wcService.post('products/batch', {
            delete: oldProductIds,
            create: wcProductInputs,
          });

          const wcBatchResponse = parseProductsBatchUpdate(rawBatchResponse);

          return wcBatchResponse.create.map(fromWooCommerceProduct);
        },
      });
    },
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
  },
});
