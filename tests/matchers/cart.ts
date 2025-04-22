import { CartPom } from 'tests/poms/cart';

export async function toHaveCartItems(
  cart: CartPom,
  expectedItems: { name: string; price: string }[],
) {
  const itemsCount = await cart.items.count();

  if (itemsCount > expectedItems.length) {
    return {
      pass: false,
      message: () =>
        `Expected cart to have ${expectedItems.length} items, but it has ${itemsCount}`,
    };
  }

  const items = await Promise.all(
    expectedItems.map((expectedItem) =>
      cart
        .getItem(expectedItem)
        .isVisible()
        .then((isVisible) => [isVisible, expectedItem] as const),
    ),
  );

  const missingItemsNames = items
    .filter(([isVisible]) => !isVisible)
    .map(([, expectedItem]) => expectedItem.name)
    .join(', ');

  if (missingItemsNames.length > 0) {
    return {
      pass: false,
      message: () => `Expected cart to have the following items: ${missingItemsNames}`,
    };
  }

  return {
    pass: true,
    message: () => `Expected cart not to have the given items`,
  };
}
