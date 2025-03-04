describe('Header', () => {
  it('should display the header with logo and shopping cart button', () => {
    cy.visit('/');

    cy.getAppHeader().within(() => {
      cy.getAppHeaderLogo().should('be.visible');
      cy.getShoppingCartButton().should('be.visible');
    });
  });
});
