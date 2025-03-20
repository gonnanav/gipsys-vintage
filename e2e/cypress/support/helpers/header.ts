export function getHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.findByRole('banner');
}

export function getLogo(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getHeader().findByRole('img', { name: "Gipsy's Vintage Logo" });
}

export function getShoppingCartButton(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getHeader().findByRole('button', { name: 'פתחי את סל הקניות' });
}

export function openShoppingCart(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getShoppingCartButton().click();
}

export function getNavigationMenuButton(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getHeader().findByRole('button', { name: 'פתחי את תפריט הניווט' });
}

export function openNavigationMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getNavigationMenuButton().click();
}
