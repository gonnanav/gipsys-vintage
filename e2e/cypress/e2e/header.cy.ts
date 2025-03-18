import { header } from '../support/helpers';

describe('Header', () => {
  it('should display the header with logo and shopping cart button', () => {
    cy.visit('/');

    header.getLogo().should('be.visible');
    header.getShoppingCartButton().should('be.visible');
  });
});
