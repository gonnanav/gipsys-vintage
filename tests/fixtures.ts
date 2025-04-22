import { test as baseTest, expect as baseExpect, Locator } from '@playwright/test';
import { createHeaderPom, HeaderPom } from './poms/header';
import { createNavigationMenuPom, NavigationMenuPom } from './poms/navigation-menu';
import { createCartPom, CartPom } from './poms/cart';
import { createHomepagePom, HomepagePom } from './poms/homepage';
import { createShopPagePom, ShopPagePom } from './poms/shop-page';
import { createProductPagePom, ProductPagePom } from './poms/product-page';

interface AppFixtures {
  header: HeaderPom;
  navigationMenu: NavigationMenuPom;
  cart: CartPom;
  homepage: HomepagePom;
  shopPage: ShopPagePom;
  productPage: ProductPagePom;
  pageHeading: Locator;
}

export const test = baseTest.extend<AppFixtures>({
  header: async ({ page }, use) => use(createHeaderPom(page)),
  navigationMenu: async ({ page }, use) => use(createNavigationMenuPom(page)),
  cart: async ({ page }, use) => use(createCartPom(page)),
  homepage: async ({ page }, use) => use(createHomepagePom(page)),
  shopPage: async ({ page }, use) => use(createShopPagePom(page)),
  productPage: async ({ page }, use) => use(createProductPagePom(page)),
  pageHeading: async ({ page }, use) => use(page.getByRole('heading', { level: 1 })),
});

export const expect = baseExpect;
