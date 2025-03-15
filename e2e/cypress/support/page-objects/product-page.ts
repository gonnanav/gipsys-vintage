import { Product } from '@/core/product';

/**
 * Page object for product-related functionality
 */

/**
 * Navigate to a specific product page
 * @param product The product to which the page belongs
 */
export function visit(product: Product): Cypress.Chainable<Cypress.AUTWindow> {
  return cy.visit(`product/${product.slug}`);
}

/**
 * Get all product cards on a page
 */
export function getProductCards(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getProductCards();
}

/**
 * Get a specific product card by name
 * @param productName The name of the product
 */
export function getProductCard(productName: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getProductCard(productName);
}

/**
 * Get the add to cart button
 */
export function getAddToCartButton(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getAddToCartButton();
}

/**
 * Add the current product to the cart
 */
export function addToShoppingCart(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getAddToCartButton().click();
}
