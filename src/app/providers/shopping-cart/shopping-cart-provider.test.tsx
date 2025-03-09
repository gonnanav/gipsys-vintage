import { act, render, screen, renderHook } from '@testing-library/react';
import {
  productWithoutImages as product1,
  productWithOneImage as product2,
} from '@/fixtures/products';
import {
  ShoppingCartProvider,
  ShoppingCartProviderProps,
  useShoppingCart,
} from './shopping-cart-provider';

it('renders the children of the shopping cart provider', () => {
  render(
    <ShoppingCartProvider>
      <div data-testid="provider-children" />
    </ShoppingCartProvider>,
  );

  expect(screen.getByTestId('provider-children')).toBeInTheDocument();
});

it('provides an empty cart by default', () => {
  const { result } = renderShoppingCartHookWithProvider();

  expect(result.current.cart).toEqual([]);
});

it('provides the given initial cart', () => {
  const initialCart = [product1, product2];

  const { result } = renderShoppingCartHookWithProvider({ initialCart });

  expect(result.current.cart).toEqual(initialCart);
});

it('throws an error if the initial cart contains duplicates', () => {
  const initialCart = [product1, product1, product2];

  expect(() => renderShoppingCartHookWithProvider({ initialCart })).toThrow(
    'Initial cart contains duplicates',
  );
});

it('throws an error if using shopping cart hook from outside the provider', () => {
  expect(() => renderHook(() => useShoppingCart())).toThrow(
    'useShoppingCart must be used within a ShoppingCartProvider',
  );
});

describe('Empty Shopping Cart', () => {
  it('adds a product to the cart', () => {
    const { result } = renderShoppingCartHookWithProvider({ initialCart: [] });

    act(() => result.current.addProduct(product1));

    expect(result.current.cart).toEqual([product1]);
  });
});

describe('Non-empty Shopping Cart', () => {
  it('adds a product to the cart', () => {
    const { result } = renderShoppingCartHookWithProvider({ initialCart: [product1] });

    act(() => result.current.addProduct(product2));

    expect(result.current.cart).toEqual([product1, product2]);
  });

  it('does nothing when adding a product that is already in the cart', () => {
    const initialCart = [product1];
    const { result } = renderShoppingCartHookWithProvider({ initialCart });

    act(() => result.current.addProduct(initialCart[0]));

    expect(result.current.cart).toEqual(initialCart);
  });
});

function renderShoppingCartHookWithProvider(
  providerProps?: Omit<ShoppingCartProviderProps, 'children'>,
) {
  return renderHook(() => useShoppingCart(), {
    wrapper: ({ children }) => (
      <ShoppingCartProvider {...providerProps}>{children}</ShoppingCartProvider>
    ),
  });
}
