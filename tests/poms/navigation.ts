import { Locator, Page } from '@playwright/test';

export interface NavigationPom {
  homepageLink: Locator;
  shopPageLink: Locator;
  policyPageLink: Locator;
  getLink: (name: string) => Locator;
}

export function createNavigation(page: Page): NavigationPom {
  const navigation = page.getByRole('navigation');
  const getLink = (name: string) => navigation.getByRole('link', { name });
  const shopPageLink = getLink('חנות');
  const policyPageLink = getLink('תקנון האתר');
  const homepageLink = getLink('עמוד הבית');

  return {
    homepageLink,
    shopPageLink,
    policyPageLink,
    getLink,
  };
}
