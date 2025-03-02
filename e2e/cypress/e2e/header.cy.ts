describe('Header', () => {
  it('should render the header', () => {
    cy.visit('/');

    cy.get('[data-testid="app-header"]').within(() => {
      cy.get('[data-testid="app-header-logo"]').should('be.visible');
    });
  });
});
