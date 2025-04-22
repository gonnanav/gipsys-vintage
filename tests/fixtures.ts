import { test as baseTest, expect as baseExpect } from '@playwright/test';
import { AppPom, createApp } from './poms';
import { toHaveProductDetails, toHaveProductCards, toHaveCartItems } from './matchers';

interface Fixtures {
  app: AppPom;
}

export const test = baseTest.extend<Fixtures>({
  app: async ({ page }, use) => use(createApp(page)),
});

export const expect = baseExpect.extend({
  toHaveProductDetails,
  toHaveProductCards,
  toHaveCartItems,
});
