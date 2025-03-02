describe('Header', () => {
  it('should render the header', () => {
    cy.visit('/');

    cy.getAppHeader().should('be.visible');

    cy.getByTestId('app-header').within(() => {
      cy.getByTestId('app-header-logo').should('be.visible');
    });
  });
});
