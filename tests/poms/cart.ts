import { Locator, Page } from '@playwright/test';

export interface CartPom {
  items: Locator;
  getItem: (item: { name: string; price: string }) => Locator;
}

export function createCart(page: Page): CartPom {
  const items = page.getByRole('listitem');
  const getItem = (item: { name: string; price: string }) =>
    items.filter({ hasText: item.name }).filter({ hasText: item.price });

  return {
    items,
    getItem,
  };
}
