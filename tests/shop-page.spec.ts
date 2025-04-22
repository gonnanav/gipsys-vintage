import { test, expect } from './fixtures';
import { expectPageToBeProductPage } from './assertions';
import { allProducts, blueJeans, blackPants, whiteTShirt, pantsCategory } from './data';

test('main shop page displays all products', async ({ app: { shopPage } }) => {
  await shopPage.goto();

  await expect(shopPage.mainHeading).toBeVisible();
  await expect(shopPage).toHaveProductCards(allProducts);
});

test('category shop page displays products from the selected category', async ({
  app: { shopPage },
}) => {
  await shopPage.goto(pantsCategory.slug);

  await expect(shopPage.getHeading(pantsCategory.name)).toBeVisible();
  await expect(shopPage).toHaveProductCards([blueJeans, blackPants]);
});

test('goes to the product page when clicking on a product card', async ({ app }) => {
  await app.shopPage.goto();
  await app.shopPage.clickProductCard(whiteTShirt);

  await expectPageToBeProductPage(app, whiteTShirt);
});
