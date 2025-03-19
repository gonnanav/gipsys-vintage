import { homepage, header, navigationMenu } from '../support/helpers';

describe('Navigation', () => {
  it('navigates through the app using the navigation menu', () => {
    homepage.visit();

    header.openNavigationMenu();
    navigationMenu.navigateToShopPage();
    verifyThatPageIsShopPage();
  });
});

function verifyThatPageIsShopPage() {
  verifyPageRelativeUrl('/shop');
}

function verifyPageRelativeUrl(url: string) {
  cy.location('pathname').should('eq', url);
}
