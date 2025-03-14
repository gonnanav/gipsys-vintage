import { Product } from '@/core/product';

export function getModal(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getByTestId('shopping-cart-modal');
}

export function getCloseButton(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getByTestId('shopping-cart-close-button');
}

export function clickCloseButton(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getCloseButton().click();
}

export function getTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getByTestId('shopping-cart-title');
}

export function getItems(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getByTestId('shopping-cart-item');
}

export function getItem(item: Product): Cypress.Chainable<JQuery<HTMLElement>> {
  return getItems().filter(`:contains("${item.name}")`);
}

export function getRemoveItemButton(item: Product): Cypress.Chainable<JQuery<HTMLElement>> {
  return getItem(item).findByTestId('shopping-cart-item-remove-button');
}

export function clickRemoveItemButton(item: Product): Cypress.Chainable<JQuery<HTMLElement>> {
  return getRemoveItemButton(item).click();
}
