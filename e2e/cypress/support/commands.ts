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
    }
  }
}

// Custom command to verify the app header is visible
Cypress.Commands.add('assertHeaderVisible', () => {
  return cy.get('[data-testid="app-header"]').should('be.visible');
});

export {};
