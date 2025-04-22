import { ProductPagePom } from 'tests/poms/product-page';

export async function toHaveProductDetails(
  productPage: ProductPagePom,
  product: { name: string; price: string; description: string },
) {
  const [isHeadingVisible, isPriceVisible, isDescriptionVisible] = await areVisible(
    productPage,
    product,
  );

  const messages = [
    { message: `Heading: ${product.name}`, isVisible: isHeadingVisible },
    { message: `Price: ${product.price}`, isVisible: isPriceVisible },
    { message: `Description: ${product.description}`, isVisible: isDescriptionVisible },
  ];

  const { missing, present } = partitionMessages(messages);

  if (missing.length) {
    return {
      pass: false,
      message: () =>
        getMessage('Expected product page to have the following product details:', missing),
    };
  }

  return {
    pass: true,
    message: () =>
      getMessage('Expected product page to not have the following product details:', present),
  };
}

async function areVisible(
  productPage: ProductPagePom,
  product: { name: string; price: string; description: string },
) {
  return Promise.all([
    productPage.getHeading(product.name).isVisible(),
    productPage.getPrice(product.price).isVisible(),
    productPage.getDescription(product.description).isVisible(),
  ]);
}

function partitionMessages(messagesVisibility: { message: string; isVisible: boolean }[]): {
  missing: string[];
  present: string[];
} {
  const missing: string[] = [];
  const present: string[] = [];

  for (const { message, isVisible } of messagesVisibility) {
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
