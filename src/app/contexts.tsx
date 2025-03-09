import { createContext } from 'react';

/**
 * Context for managing the root element for modal components.
 *
 * This context allows explicitly setting the root element for modals.
 * The default value is `null`, which leaves the decision of the root element
 * to the consumers.
 */
export const ModalPortalRootContext = createContext<Element | null>(null);
