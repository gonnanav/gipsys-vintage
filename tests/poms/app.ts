import { Locator, Page } from '@playwright/test';
import { HeaderPom, createHeader } from './header';
import { NavigationPom, createNavigation } from './navigation';
import { CartPom, createCart } from './cart';
import { HomepagePom, createHomepage } from './homepage';
import { ShopPagePom, createShopPage } from './shop-page';
import { ProductPagePom, createProductPage } from './product-page';
import { PolicyPagePom, createPolicyPage } from './policy-page';

export interface AppPom {
  page: Page;
  header: HeaderPom;
  cart: CartPom;
  navigation: NavigationPom;
  homepage: HomepagePom;
  shopPage: ShopPagePom;
  productPage: ProductPagePom;
  policyPage: PolicyPagePom;
  openNavigationMenuAndClickLink: (link: Locator) => Promise<void>;
}

export function createApp(page: Page): AppPom {
  const header = createHeader(page);
  const navigation = createNavigation(page);
  const cart = createCart(page);
  const homepage = createHomepage(page);
  const shopPage = createShopPage(page);
  const productPage = createProductPage(page);
  const policyPage = createPolicyPage(page);

  const openNavigationMenuAndClickLink = async (link: Locator) => {
    await header.navigationMenuButton.click();
    await link.click();
  };

  return {
    page,
    header,
    navigation,
    cart,
    homepage,
    shopPage,
    productPage,
    policyPage,
    openNavigationMenuAndClickLink,
  };
}
