import { Category } from '@/core/category';
import { Product } from '@/core/product';

/**
 * Navigate to the main shop page
 */
export function visit(): Cypress.Chainable<Cypress.AUTWindow> {
  return cy.visit('/shop');
}

/**
 * Navigate to a specific category page
 * @param category The category to navigate to
 */
export function visitCategory(category: Category): Cypress.Chainable<Cypress.AUTWindow> {
  return cy.visit(`/shop/category/${category.slug}`);
}

/**
 * Get all product on the shop page
 */
export function getProducts(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.findAllByRole('article');
}

/**
 * Get a specific product by name
 * @param productName The name of the product
 */
export function getProduct(productName: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return getProducts().filter(`:contains("${productName}")`);
}

/**
 * Go to a specific product page from the shop page
 * @param product The product to navigate to
 */
export function goToProduct(product: Product): Cypress.Chainable<JQuery<HTMLElement>> {
  return getProduct(product.name).click();
}
