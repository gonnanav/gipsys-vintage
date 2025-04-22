import { Locator, Page, Response } from '@playwright/test';

export interface ShopPagePom {
  gotoMainPage: () => Promise<Response | null>;
  gotoCategory: (slug: string) => Promise<Response | null>;
  productCardHeadings: Locator;
  getProductCard: (name: string) => Locator;
}

export function createShopPagePom(page: Page): ShopPagePom {
  const gotoMainPage = () => page.goto('/shop');
  const gotoCategory = (slug: string) => page.goto(`/shop/${slug}`);
  const productCards = page.getByRole('article');
  const productCardHeadings = productCards.getByRole('heading', { level: 2 });
  const getProductCard = (name: string) => productCards.filter({ hasText: name });

  return {
    gotoMainPage,
    gotoCategory,
    productCardHeadings,
    getProductCard,
  };
}
