declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute
       * @param testId The data-testid attribute value
       * @example cy.getByTestId('app-header')
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to get the app header
       * @example cy.getAppHeader()
       */
      getAppHeader(): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to get the app header logo
       * @example cy.getAppHeaderLogo()
       */
      getAppHeaderLogo(): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to get the page heading
       * @param text The expected text of the heading
       * @example cy.getPageHeading('Shop')
       */
      getPageHeading(text: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to get all product cards on a page
       * @example cy.getProductCards()
       */
      getProductCards(): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select product card by name
       * @example cy.getProductCard('Blue Jeans')
       */
      getProductCard(productName: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getAppHeader', () => {
  return cy.getByTestId('app-header');
});

Cypress.Commands.add('getAppHeaderLogo', () => {
  return cy.getByTestId('app-header-logo');
});

Cypress.Commands.add('getPageHeading', (text) => {
  return cy.contains('h1', text);
});

Cypress.Commands.add('getProductCards', () => {
  return cy.getByTestId('product-card');
});

Cypress.Commands.add('getProductCard', (productName) => {
  return cy.contains('[data-testid="product-card"]', productName);
});

export {};
