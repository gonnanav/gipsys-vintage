import { Page, Locator } from '@playwright/test';

export interface PolicyPagePom {
  url: string;
  heading: Locator;
}

export function createPolicyPage(page: Page): PolicyPagePom {
  const url = '/policy';
  const heading = page.getByRole('heading', { name: 'תקנון האתר' });

  return { url, heading };
}
