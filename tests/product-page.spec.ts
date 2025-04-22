import { test, expect } from './fixtures';
import { whiteTShirt } from './data';

test('displays the product details and adds the product to the cart', async ({
  app: { productPage, cart },
}) => {
  await productPage.goto(whiteTShirt.slug);
  await expect(productPage).toHaveProductDetails(whiteTShirt);

  await productPage.clickAddToCart();
  await expect(cart).toHaveCartItems([whiteTShirt]);
});
