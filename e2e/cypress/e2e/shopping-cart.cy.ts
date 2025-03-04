describe('Shopping Cart', () => {
  it('should toggle shopping cart', () => {
    cy.visit('/');

    cy.getShoppingCartButton().should('be.visible');
    cy.getShoppingCartButton().click();

    cy.getShoppingCartModal().within(() => {
      cy.getShoppingCartTitle().should('be.visible');
      cy.getShoppingCartCloseButton().click();
      cy.getShoppingCartModal().should('not.exist');
    });
  });
});
