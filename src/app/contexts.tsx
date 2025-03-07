import { createContext } from 'react';

/**
 * Context for managing the root element for modal components.
 *
 * This context allows explicitly setting the root element for modals.
 * The default value is `null`, which leaves the decision of the root element
 * to the consumers.
 */
export const ModalPortalRootContext = createContext<Element | null>(null);

/**
 * Interface defining the shopping cart context functionality.
 */
export interface ShoppingCartContextType {
  /**
   * Function to add a product to the shopping cart.
   */
  onAddProduct: () => void;
}

/**
 * Context for managing shopping cart functionality.
 *
 * This context provides methods for interacting with the shopping cart.
 * The default implementation throws errors to ensure proper provider implementation.
 */
export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  onAddProduct: () => {
    throw new Error('onAddProduct is not implemented');
  },
});
