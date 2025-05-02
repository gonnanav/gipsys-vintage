import { expect, ExpectMatcherState } from '@playwright/test';
import { ShopPagePom } from 'tests/poms/shop-page';

export async function toHaveProductCards(
  this: ExpectMatcherState,
  shopPage: ShopPagePom,
  products: { name: string; price: string }[],
) {
  const productNames = products.map((p) => p.name);
  const productNamesStr = this.utils.stringify(productNames);

  try {
    await expect(shopPage.productCardHeadings).toHaveText(productNames);
  } catch (e: any) {
    const { expected, actual } = e.matcherResult;
    const diff = this.utils.printDiffOrStringify(
      expected,
      actual,
      'Expected product cards:',
      'Received product cards:',
      false,
    );

    return {
      pass: false,
      message: () => `product cards found in shop page are not as expected.\n\n${diff}`,
    };
  }

  return {
    pass: true,
    message: () =>
      `expected shop page not to have the following product cards: ${productNamesStr}, but it does.`,
  };
}
