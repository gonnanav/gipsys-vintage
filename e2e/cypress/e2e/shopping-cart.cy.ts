describe('Shopping Cart', () => {
  it('should display the shopping cart button', () => {
    cy.visit('/');

    cy.getShoppingCartButton().should('be.visible');
  });
});
