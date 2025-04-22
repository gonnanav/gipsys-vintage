import { expect } from './fixtures';
import { AppPom } from './poms';

export async function expectPageToBeHomepage(app: AppPom) {
  await expect(app.page).toHaveURL(app.homepage.url);
}

export async function expectPageToBeShopPage(app: AppPom) {
  await expect(app.page).toHaveURL(app.shopPage.url);
  await expect(app.shopPage.mainHeading).toBeVisible();
}

export async function expectPageToBeProductPage(
  app: AppPom,
  product: { name: string; slug: string },
) {
  await expect(app.page).toHaveURL(`product/${product.slug}`);
  await expect(app.productPage.getHeading(product.name)).toBeVisible();
}

export async function expectPageToBePolicyPage(app: AppPom) {
  await expect(app.page).toHaveURL(app.policyPage.url);
  await expect(app.policyPage.heading).toBeVisible();
}
