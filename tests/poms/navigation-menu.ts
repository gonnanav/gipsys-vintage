import { Locator, Page } from '@playwright/test';

export interface NavigationMenuPom {
  getLink: (name: string) => Locator;
  homepageLink: Locator;
  shopLink: Locator;
  policyLink: Locator;
}

export function createNavigationMenuPom(page: Page): NavigationMenuPom {
  const navigationMenu = page.getByRole('navigation');
  const getLink = (name: string) => navigationMenu.getByRole('link', { name });
  const homepageLink = getLink('עמוד הבית');
  const shopLink = getLink('חנות');
  const policyLink = getLink('תקנון האתר');

  return {
    getLink,
    homepageLink,
    shopLink,
    policyLink,
  };
}
