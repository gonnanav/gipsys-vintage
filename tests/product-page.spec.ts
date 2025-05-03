import { test, expect } from './fixtures';
import { whiteTShirt } from './data';

test('displays the product details and adds the product to the cart', async ({
  page,
  app: { productPage, cart },
}) => {
  const { slug, name, price, description } = whiteTShirt;
  await productPage.goto(slug);

  await expect(productPage.getHeading(name), 'missing product name').toBeVisible();
  await expect(page.getByText(price), 'missing product price').toBeVisible();
  await expect(page.getByText(description), 'missing product description').toBeVisible();

  await productPage.clickAddToCart();
  await expect(cart).toHaveCartItems([whiteTShirt]);
});
