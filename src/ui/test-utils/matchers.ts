declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      /**
       * Checks if an element has the expected data-testid attribute value.
       * This matcher provides a more semantic way to verify test IDs compared to checking attributes directly.
       *
       * @param testId - The expected data-testid value
       * @example
       * ```tsx
       * expect(element).toHaveTestId('my-element');
       * expect(screen.getByRole('button')).toHaveTestId('submit-button');
       * ```
       */
      toHaveTestId(testId: string): R;

      /**
       * Checks if an element is a direct child of a specific parent element.
       *
       * @param parent - The expected parent element
       * @example
       * ```tsx
       * expect(element).toBeChildOf(parentElement);
       * expect(modal).toBeChildOf(document.body);
       * ```
       */
      toBeChildOf(parent: Element): R;
    }
  }
}

expect.extend({
  toHaveTestId(received: Element, testId: string) {
    const actualTestId = received.getAttribute('data-testid');
    const pass = actualTestId === testId;

    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have data-testid="${testId}", but it did`
          : `Expected element to have data-testid="${testId}", but found "${actualTestId || 'no data-testid'}"`,
    };
  },
});

expect.extend({
  toBeChildOf(received: Element, parent: Element) {
    const { parentElement } = received;
    const pass = parentElement === parent;

    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to be a direct child of the specified parent, but it was`
          : `Expected element to be a direct child of the specified parent, but it wasn't`,
    };
  },
});

export {};
