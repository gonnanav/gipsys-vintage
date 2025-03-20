import { Product } from '@/core/product';

export function getCloseButton(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.findByRole('button', { name: 'סגרי את עגלת הקניות' });
}

export function close(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getCloseButton().click();
}

export function getItems(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.findAllByRole('listitem');
}

export function getItem(item: Product): Cypress.Chainable<JQuery<HTMLElement>> {
  return getItems().filter(`:contains("${item.name}")`);
}

export function getRemoveItemButton(item: Product): Cypress.Chainable<JQuery<HTMLElement>> {
  return getItem(item).findByRole('button', { name: 'הסירי מסל הקניות' });
}

export function removeItem(item: Product): Cypress.Chainable<JQuery<HTMLElement>> {
  return getRemoveItemButton(item).click();
}
