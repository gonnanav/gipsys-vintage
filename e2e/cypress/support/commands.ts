// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to verify that the app header is visible
       * @example cy.assertHeaderVisible()
       */
      assertHeaderVisible(): Chainable<JQuery<HTMLElement>>;

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
    }
  }
}

// Custom command to verify the app header is visible
Cypress.Commands.add('assertHeaderVisible', () => {
  return cy.getByTestId('app-header').should('be.visible');
});

// Custom command to select elements by data-testid attribute
Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Custom command to select product card by name
Cypress.Commands.add('getProductCard', (productName) => {
  return cy.contains('[data-testid="product-card"]', productName);
});

export {};
