/**
 * Page object for shopping cart functionality
 */

/**
 * Open the shopping cart modal
 */
export function open(): Cypress.Chainable<JQuery<HTMLElement>> {
  cy.getShoppingCartButton().click();
  return getModal();
}

/**
 * Close the shopping cart modal
 */
export function close(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getShoppingCartCloseButton().click();
}

/**
 * Get the shopping cart modal
 */
export function getModal(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getShoppingCartModal();
}

/**
 * Get the shopping cart button in the header
 */
export function getButton(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getShoppingCartButton();
}

/**
 * Get the shopping cart title
 */
export function getTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getShoppingCartTitle();
}

/**
 * Get all shopping cart items
 */
export function getItems(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getShoppingCartItems();
}

/**
 * Get the empty cart message
 */
export function getEmptyMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getShoppingCartEmptyMessage();
}
