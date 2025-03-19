export function getNavigationMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getByTestId('navigation-menu');
}

export function navigateToShopPage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getNavigationMenu().contains('חנות').click();
}
