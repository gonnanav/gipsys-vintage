import { renderHook } from '@testing-library/react';
import { useAppStore, AppStoreProvider } from './store-provider';
import {
  productWithManyImages as product1,
  productWithOneImage as product2,
} from '@/fixtures/products';
import { act } from 'react';

it('throws an error when used outside the store provider', () => {
  expect(() => renderHook(() => useAppStore((state) => state))).toThrow(
    'useAppStore must be used within an AppStoreProvider',
  );
});

it('returns the default initial state by default', () => {
  const { result } = renderHook(() => useAppStore((state) => state), {
    wrapper: AppStoreProvider,
  });

  expect(result.current).toEqual({
    cartItems: [],
    addCartItem: expect.any(Function),
    removeCartItem: expect.any(Function),
  });
});

it('overrides the default initial state with the given initial state', () => {
  const partialInitialState = {
    cartItems: [product1, product2],
  };

  const { result } = renderHook(() => useAppStore((state) => state), {
    wrapper: ({ children }) => (
      <AppStoreProvider initialState={partialInitialState}>{children}</AppStoreProvider>
    ),
  });

  expect(result.current.cartItems).toEqual(partialInitialState.cartItems);
});

it('maintains the store state when re-rendering', () => {
  // Arrange
  const { result, rerender } = renderHook(() => useAppStore((state) => state), {
    wrapper: AppStoreProvider,
  });
  act(() => result.current.addCartItem(product1));

  // Act
  rerender();

  // Assert
  expect(result.current.cartItems).toEqual([product1]);
});
