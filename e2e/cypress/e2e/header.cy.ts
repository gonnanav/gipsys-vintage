describe('Header', () => {
  it('should render the header', () => {
    cy.visit('/');

    cy.getAppHeader().within(() => {
      cy.getAppHeaderLogo().should('be.visible');
    });
  });
});
