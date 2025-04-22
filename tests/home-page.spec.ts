import { test } from './fixtures';
import { expectPageToBeShopPage } from './assertions';

test('goes to the shop page when clicking the shop link', async ({ app }) => {
  await app.homepage.goto();
  await app.homepage.shopLink.click();

  await expectPageToBeShopPage(app);
});
