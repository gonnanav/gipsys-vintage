import { header } from '../support/page-objects';

describe('Header', () => {
  it('should display the header with logo and shopping cart button', () => {
    cy.visit('/');

    header.getLogo().should('be.visible');
    header.getShoppingCartButton().should('be.visible');
  });
});
