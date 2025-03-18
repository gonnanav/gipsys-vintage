import { Product } from '@/core/product';

/**
 * Navigate to a specific product page
 * @param product The product to which the page belongs
 */
export function visit(product: Product): Cypress.Chainable<Cypress.AUTWindow> {
  return cy.visit(`product/${product.slug}`);
}

/**
 * Get the product gallery
 */
export function getGallery(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getByTestId('product-gallery');
}

/**
 * Get the add to cart button
 */
export function getAddToCartButton(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.getByTestId('add-to-cart-button');
}

/**
 * Add the current product to the cart
 */
export function addToShoppingCart(): Cypress.Chainable<JQuery<HTMLElement>> {
  return getAddToCartButton().click();
}
