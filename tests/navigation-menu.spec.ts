import { test, expect } from './fixtures';
import { pantsCategory } from './data';

test('navigates to the homepage', async ({ page, header, navigationMenu, homepage, shopPage }) => {
  await shopPage.gotoMainPage();

  await header.navigationMenuButton.click();
  await navigationMenu.homepageLink.click();

  await expect(page).toHaveURL('/');
  await expect(homepage.heroImage).toBeVisible();
});

test('navigates to the main shop page', async ({
  page,
  header,
  navigationMenu,
  homepage,
  pageHeading,
}) => {
  await homepage.goto();

  await header.navigationMenuButton.click();
  await navigationMenu.shopLink.click();

  await expect(page).toHaveURL('/shop');
  await expect(pageHeading).toHaveText('חנות');
});

test('navigates to the shop category page', async ({
  page,
  header,
  navigationMenu,
  homepage,
  pageHeading,
}) => {
  await homepage.goto();

  await header.navigationMenuButton.click();
  await navigationMenu.getLink(pantsCategory.name).click();

  await expect(page).toHaveURL(`/shop/${pantsCategory.slug}`);
  await expect(pageHeading).toHaveText(pantsCategory.name);
});

test('navigates to the policy page', async ({
  page,
  header,
  navigationMenu,
  homepage,
  pageHeading,
}) => {
  await homepage.goto();

  await header.navigationMenuButton.click();
  await navigationMenu.policyLink.click();

  await expect(page).toHaveURL('/policy');
  await expect(pageHeading).toHaveText('תקנון האתר');
});
