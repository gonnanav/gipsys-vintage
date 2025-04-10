import { renderHook } from '@testing-library/react';
import { useAppStore, AppStoreProvider } from './store-provider';
import { leatherJacket, puffSleeveTop } from '@/fixtures/products';
import { act } from 'react';

it('throws an error when used outside the store provider', () => {
  expect(() => renderHook(() => useAppStore((state) => state))).toThrow(
    'useAppStore must be used within an AppStoreProvider',
  );
});

it('overrides the default initial state with the given initial state', () => {
  const partialInitialState = {
    cartItems: [leatherJacket, puffSleeveTop],
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
  act(() => result.current.addCartItem(leatherJacket));

  // Act
  rerender();

  // Assert
  expect(result.current.cartItems).toEqual([leatherJacket]);
});
