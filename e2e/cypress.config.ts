// Load environment variables from .env files located in the root project directory
import { loadEnvConfig } from '@next/env';
import * as path from 'path';

const rootProjectDir = path.dirname(process.cwd());
loadEnvConfig(rootProjectDir);

import { defineConfig } from 'cypress';
import { wcService } from '@/services';
import { parseCategoriesIds, parseCategoriesBatchUpdate } from '@/transformers/category';
import { parseProductsIds, parseProductsBatchUpdate } from '@/transformers/product';
import { toWooCommerceProductInput } from '@/transformers/woocommerce/product';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        'seed:categories': async (newCategories) => {
          const rawCategories = await wcService.get('products/categories');
          const oldCategoryIds = parseCategoriesIds(rawCategories);

          await wcService.post('products/categories/batch', {
            delete: oldCategoryIds,
          });
          const rawBatchUpdate = await wcService.post('products/categories/batch', {
            create: newCategories,
          });

          return parseCategoriesBatchUpdate(rawBatchUpdate);
        },
        'seed:products': async (newProducts) => {
          const rawProducts = await wcService.get('products');
          const oldProductIds = parseProductsIds(rawProducts);
          const wcProductInputs = newProducts.map(toWooCommerceProductInput);

          const rawBatchUpdate = await wcService.post('products/batch', {
            delete: oldProductIds,
            create: wcProductInputs,
          });

          return parseProductsBatchUpdate(rawBatchUpdate);
        },
      });
    },
    baseUrl: process.env.E2E_BASE_URL || 'http://localhost:3000',
  },
});
