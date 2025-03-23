import { Category } from '@/core/category';

export function getNavigationMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.findByRole('navigation');
}

export function navigateToShopPage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getNavigationMenu().findByRole('link', { name: 'חנות' }).click();
}

export function navigateToWebsitePolicyPage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getNavigationMenu().findByRole('link', { name: 'תקנון האתר' }).click();
}

export function navigateToHomePage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getNavigationMenu().findByRole('link', { name: 'עמוד הבית' }).click();
}

export function navigateToCategory(category: Category): Cypress.Chainable<JQuery<HTMLElement>> {
  return getNavigationMenu().findByRole('link', { name: category.name }).click();
}
