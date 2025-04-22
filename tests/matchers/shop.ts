import { ShopPagePom } from 'tests/poms/shop-page';

export async function toHaveProductCards(
  shopPage: ShopPagePom,
  products: { name: string; price: string }[],
) {
  const count = await shopPage.productCards.count();
  const enhancedProducts = await areVisible(shopPage, products);

  if (count !== products.length) {
    return {
      pass: false,
      message: () => `Expected ${products.length} product cards, but got ${count}`,
    };
  }

  const messages = enhancedProducts.map(({ name, price, isVisible }) => ({
    message: `${name} ${price}`,
    isVisible,
  }));
  const { missing, present } = partitionProducts(messages);

  if (missing.length) {
    return {
      pass: false,
      message: () => getMessage('Expected shop page to have the following product cards:', missing),
    };
  }

  return {
    pass: true,
    message: () =>
      getMessage('Expected shop page to not have the following product cards:', present),
  };
}

async function areVisible(shopPage: ShopPagePom, products: { name: string; price: string }[]) {
  return Promise.all(
    products.map(async (product) => {
      const isVisible = await shopPage.getProductCard(product).isVisible();

      return {
        ...product,
        isVisible,
      };
    }),
  );
}

function partitionProducts(messages: { message: string; isVisible: boolean }[]) {
  const missing: string[] = [];
  const present: string[] = [];

  for (const { message, isVisible } of messages) {
    if (isVisible) {
      present.push(message);
    } else {
      missing.push(message);
    }
  }

  return { missing, present };
}

function getMessage(mainMessage: string, messages: string[]) {
  return [mainMessage, ...messages].join('\n');
}
