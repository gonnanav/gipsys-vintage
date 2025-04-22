import { test, expect } from './fixtures';
import { whiteTShirt } from './data';

test('displays the product details and adds the product to the cart', async ({
  page,
  productPage,
  cart,
  pageHeading,
}) => {
  await productPage.goto(whiteTShirt.slug);

  await expect(pageHeading).toHaveText(whiteTShirt.name);
  await expect(page.getByText(whiteTShirt.price)).toBeVisible();
  await expect(page.getByText(whiteTShirt.description)).toBeVisible();

  await productPage.addToCartButton.click();

  await expect(cart.items).toContainText(whiteTShirt.name);
});
