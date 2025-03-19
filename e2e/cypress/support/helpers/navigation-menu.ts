export function getNavigationMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get('nav');
}

export function navigateToShopPage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getNavigationMenu().contains('חנות').click();
}

export function navigateToHomePage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getNavigationMenu().contains('עמוד הבית').click();
}
