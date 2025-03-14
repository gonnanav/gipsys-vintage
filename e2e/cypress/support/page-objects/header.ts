export function getHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getByTestId('app-header');
}

export function getShoppingCartButton(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getHeader().findByTestId('shopping-cart-button');
}

export function openShoppingCart(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getShoppingCartButton().click();
}
