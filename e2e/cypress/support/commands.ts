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
       * Custom command to find DOM element by data-testid attribute
       * @param testId The data-testid attribute value
       * @example cy.findByTestId('app-header')
       */
      findByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to get the page heading
       * @param text The expected text of the heading
       * @example cy.getPageHeading('Shop')
       */
      getPageHeading(text: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

function testIdSelector(testId: string): string {
  return `[data-testid="${testId}"]`;
}

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(testIdSelector(testId));
});

Cypress.Commands.add('findByTestId', { prevSubject: true }, (subject, testId) => {
  return cy.wrap(subject).find(testIdSelector(testId));
});

Cypress.Commands.add('getPageHeading', (text) => {
  return cy.contains('h1', text);
});

export {};
