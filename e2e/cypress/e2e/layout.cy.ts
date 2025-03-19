import { header, homepage, shopPage } from '../support/helpers';

describe('Layout', () => {
  it('displays the header across different pages', () => {
    homepage.visit();
    verifyThatHeaderIsDisplayed();

    shopPage.visit();
    verifyThatHeaderIsDisplayed();
  });
});

function verifyThatHeaderIsDisplayed(): void {
  header.getLogo().should('be.visible');
  header.getShoppingCartButton().should('be.visible');
}
