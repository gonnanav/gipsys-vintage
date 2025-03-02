import { Product } from '@/core/product';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to verify that the app header is visible
       * @example cy.verifyAppHeaderVisible()
       */
      verifyAppHeaderVisible(): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to verify the main heading of a page
       * @param text The expected text of the heading
       * @example cy.verifyPageHeading('Shop')
       */
      verifyPageHeading(text: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select DOM element by data-testid attribute
       * @example cy.getByTestId('app-header')
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select product card by name
       * @example cy.getProductCard('Blue Jeans')
       */
      getProductCard(productName: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to verify a product card based on a product's properties
       * @param product The product that the product card should match
       * @example cy.verifyProductCard(someProduct)
       */
      verifyProductCard(product: Product): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('verifyAppHeaderVisible', () => {
  return cy.getByTestId('app-header').should('be.visible');
});

Cypress.Commands.add('verifyPageHeading', (text) => {
  return cy.contains('h1', text).should('be.visible');
});

// Custom command to select elements by data-testid attribute
Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Custom command to select product card by name
Cypress.Commands.add('getProductCard', (productName) => {
  return cy.contains('[data-testid="product-card"]', productName);
});

Cypress.Commands.add('verifyProductCard', (product) => {
  return cy.getProductCard(product.name).within(() => {
    cy.contains(product.name).should('be.visible');
    cy.contains(product.price).should('be.visible');
    cy.getByTestId('product-card-image').should('be.visible');
  });
});

export {};
