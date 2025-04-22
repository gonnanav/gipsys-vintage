import { test, expect } from './fixtures';
import { allProducts, blueJeans, blackPants, whiteTShirt, pantsCategory } from './data';

test('main shop page displays all products', async ({ shopPage, pageHeading }) => {
  await shopPage.gotoMainPage();

  await expect(pageHeading).toHaveText('חנות');
  await expect(shopPage.productCardHeadings).toHaveText(allProducts.map((p) => p.name));
});

test('category shop page displays products from the selected category', async ({
  shopPage,
  pageHeading,
}) => {
  await shopPage.gotoCategory(pantsCategory.slug);

  await expect(pageHeading).toHaveText(pantsCategory.name);
  await expect(shopPage.productCardHeadings).toHaveText([blueJeans, blackPants].map((p) => p.name));
});

test('goes to the product page when clicking on a product card', async ({
  page,
  shopPage,
  pageHeading,
}) => {
  await shopPage.gotoMainPage();
  await shopPage.getProductCard(whiteTShirt.name).click();

  await expect(page).toHaveURL(`/product/${whiteTShirt.slug}`);
  await expect(pageHeading).toHaveText(whiteTShirt.name);
});
