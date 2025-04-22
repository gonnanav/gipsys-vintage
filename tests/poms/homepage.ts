import { Locator, Page, Response } from '@playwright/test';

export interface HomepagePom {
  goto: () => Promise<Response | null>;
  heroImage: Locator;
  shopLink: Locator;
}

export function createHomepagePom(page: Page): HomepagePom {
  const goto = () => page.goto('/');
  const heroImage = page.getByRole('img', { name: `תמונה ראשית של ג'יפסיז וינטג'` });
  const shopLink = page.getByRole('link', { name: /shop now/i });

  return {
    goto,
    heroImage,
    shopLink,
  };
}
