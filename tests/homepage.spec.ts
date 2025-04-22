import { test, expect } from './fixtures';

test('displays the hero image and the shop link', async ({ homepage }) => {
  await homepage.goto();

  await expect(homepage.heroImage).toBeVisible();
  await expect(homepage.shopLink).toBeVisible();
});

test('goes to the shop page when clicking the shop link', async ({
  page,
  homepage,
  pageHeading,
}) => {
  await homepage.goto();
  await homepage.shopLink.click();

  await expect(page).toHaveURL('/shop');
  await expect(pageHeading).toHaveText('חנות');
});
