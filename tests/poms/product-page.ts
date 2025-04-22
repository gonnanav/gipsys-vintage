import { Locator, Page, Response } from '@playwright/test';

export interface ProductPagePom {
  goto: (slug: string) => Promise<Response | null>;
  addToCartButton: Locator;
}

export function createProductPagePom(page: Page): ProductPagePom {
  const goto = (slug: string) => page.goto(`/product/${slug}`);
  const addToCartButton = page.getByRole('button', { name: 'הוסיפי לסל הקניות' });

  return {
    goto,
    addToCartButton,
  };
}
