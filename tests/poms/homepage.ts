import { Locator, Page, Response } from '@playwright/test';

export interface HomepagePom {
  url: string;
  goto: () => Promise<Response | null>;
  shopLink: Locator;
}

export function createHomepage(page: Page): HomepagePom {
  const url = '/';
  const goto = () => page.goto(url);
  const shopLink = page.getByRole('link', { name: /shop now/i });

  return {
    url,
    goto,
    shopLink,
  };
}
