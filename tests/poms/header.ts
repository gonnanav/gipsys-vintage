import { Locator, Page } from '@playwright/test';

export interface HeaderPom {
  navigationMenuButton: Locator;
}

export function createHeaderPom(page: Page): HeaderPom {
  const navigationMenuButton = page.getByRole('button', { name: 'פתחי את תפריט הניווט' });

  return {
    navigationMenuButton,
  };
}
