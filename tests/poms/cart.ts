import { Locator, Page } from '@playwright/test';

export interface CartPom {
  items: Locator;
}

export function createCartPom(page: Page): CartPom {
  const items = page.getByRole('listitem');

  return {
    items,
  };
}
