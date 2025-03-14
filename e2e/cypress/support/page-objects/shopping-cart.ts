import { Product } from '@/core/product';

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
  return cy.getByTestId('shopping-cart-item');
}

/**
 * Get an item from the shopping cart
 * @param product - The product matching the item to get
 */
export function getItem(product: Product): Cypress.Chainable<JQuery<HTMLElement>> {
  return getItems().filter(`:contains("${product.name}")`);
}

/**
 * Get the empty cart message
 */
export function getEmptyMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getShoppingCartEmptyMessage();
}

/**
 * Remove an item from the shopping cart
 * @param product - The product matching the item to remove
 */
export function removeItem(product: Product): Cypress.Chainable<JQuery<HTMLElement>> {
  return getItem(product).findByTestId('shopping-cart-item-remove-button').click();
}
