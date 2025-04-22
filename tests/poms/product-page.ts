import { Locator, Page, Response } from '@playwright/test';

export interface ProductPagePom {
  goto: (slug: string) => Promise<Response | null>;
  getHeading: (name: string) => Locator;
  getPrice: (price: string) => Locator;
  getDescription: (description: string) => Locator;
  clickAddToCart: () => Promise<void>;
}

export function createProductPage(page: Page): ProductPagePom {
  const getUrl = (slug: string) => `/product/${slug}`;
  const goto = (slug: string) => page.goto(getUrl(slug));
  const getHeading = (name: string) => page.getByRole('heading', { level: 1, name });
  const getPrice = (price: string) => page.getByText(price);
  const getDescription = (description: string) => page.getByText(description);

  const addToCartButton = page.getByRole('button', { name: 'הוסיפי לסל הקניות' });
  const clickAddToCart = () => addToCartButton.click();

  return {
    goto,
    getHeading,
    getPrice,
    getDescription,
    clickAddToCart,
  };
}
