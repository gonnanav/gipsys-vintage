import { test } from './fixtures';
import {
  expectPageToBeHomepage,
  expectPageToBeShopPage,
  expectPageToBePolicyPage,
} from './assertions';

test('navigates between pages', async ({ app }) => {
  await app.homepage.goto();

  await app.openNavigationMenuAndClickLink(app.navigation.shopPageLink);
  await expectPageToBeShopPage(app);

  await app.openNavigationMenuAndClickLink(app.navigation.policyPageLink);
  await expectPageToBePolicyPage(app);

  await app.openNavigationMenuAndClickLink(app.navigation.homepageLink);
  await expectPageToBeHomepage(app);
});
