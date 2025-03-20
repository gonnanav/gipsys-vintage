declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
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
