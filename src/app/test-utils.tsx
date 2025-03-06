import { useState } from 'react';
import { ModalPortalRootContext } from './contexts';

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

/**
 * Creates a wrapper component that provides a portal root element for testing modal components.
 * The wrapper creates a div element that serves as the portal root and provides it through
 * the ModalPortalRootContext to its children.
 *
 * @param portalRootTestId - The test id to be applied to the portal root element for querying in tests
 * @returns A React component that wraps its children with the portal context
 * @example
 * ```tsx
 * const PortalWrapper = createPortalWrapper('my-portal-root');
 * render(<MyModalComponent />, { wrapper: PortalWrapper });
 * const portalRoot = screen.getByTestId('my-portal-root');
 * ```
 */
export function createPortalWrapper(portalRootTestId: string) {
  return function PortalWrapper({ children }: { children: React.ReactNode }) {
    const [portalRoot, setPortalRoot] = useState<HTMLDivElement | null>(null);

    return (
      <div data-testid={portalRootTestId} ref={setPortalRoot}>
        {portalRoot && (
          <ModalPortalRootContext.Provider value={portalRoot}>
            {children}
          </ModalPortalRootContext.Provider>
        )}
      </div>
    );
  };
}
