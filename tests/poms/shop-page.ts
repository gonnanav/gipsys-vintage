import { Locator, Page, Response } from '@playwright/test';

export interface ShopPagePom {
  url: string;
  mainHeading: Locator;
  productCards: Locator;
  productCardHeadings: Locator;
  goto: (category?: string) => Promise<Response | null>;
  getHeading: (name: string) => Locator;
  getProductCard: (product: { name: string; price: string }) => Locator;
  clickProductCard: (product: { name: string; price: string }) => Promise<void>;
}

export function createShopPage(page: Page): ShopPagePom {
  const url = '/shop';
  const goto = (category?: string) => page.goto(category ? `${url}/${category}` : url);
  const getHeading = (name: string) => page.getByRole('heading', { level: 1, name });
  const mainHeading = getHeading('חנות');
  const productCards = page.getByRole('article');
  const productCardHeadings = productCards.getByRole('heading', { level: 2 });
  const getProductCard = ({ name, price }: { name: string; price: string }) =>
    productCards
      .filter({ hasText: name })
      .filter({ hasText: price })
      .filter({ has: page.getByRole('img') });
  const clickProductCard = (product: { name: string; price: string }) =>
    getProductCard(product).click();

  return {
    url,
    mainHeading,
    productCards,
    productCardHeadings,
    goto,
    getHeading,
    getProductCard,
    clickProductCard,
  };
}
