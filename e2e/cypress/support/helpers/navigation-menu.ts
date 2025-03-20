export function getNavigationMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.findByRole('navigation');
}

export function navigateToShopPage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getNavigationMenu().findByRole('link', { name: 'חנות' }).click();
}

export function navigateToHomePage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getNavigationMenu().findByRole('link', { name: 'עמוד הבית' }).click();
}
