import { expect, ExpectMatcherState } from '@playwright/test';
import { CartPom } from 'tests/poms/cart';

export async function toHaveCartItems(
  this: ExpectMatcherState,
  cart: CartPom,
  expectedItems: { name: string; price: string }[],
) {
  const itemNames = expectedItems.map(({ name }) => name);
  const itemNamesStr = this.utils.stringify(itemNames);

  try {
    await expect(cart.items).toContainText(itemNames);
  } catch (e: any) {
    const { expected, actual } = e.matcherResult;
    const diff = this.utils.printDiffOrStringify(
      expected,
      actual,
      'Expected cart items:',
      'Actual cart items:',
      false,
    );

    return {
      pass: false,
      message: () => `items found in cart are not as expected:\n\n${diff}`,
    };
  }

  return {
    pass: true,
    message: () => `expected cart not to have the following items: ${itemNamesStr}, but it does.`,
  };
}
