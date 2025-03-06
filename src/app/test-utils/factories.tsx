import { useState } from 'react';
import { ModalPortalRootContext } from '@/app/contexts';

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
