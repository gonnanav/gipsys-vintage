import { renderHook, act } from '@testing-library/react';
import {
  ShoppingCartDrawerProvider,
  ShoppingCartDrawerProviderProps,
  useShoppingCartDrawer,
} from './shopping-cart-drawer-provider';

describe('Initial Rendering', () => {
  test('throws error when used outside the provider', () => {
    expect(() => renderHook(() => useShoppingCartDrawer())).toThrow(
      'useShoppingCartDrawer must be used within a ShoppingCartDrawerProvider',
    );
  });

  test('renders the drawer closed by default', () => {
    const { result } = renderShoppingCartDrawerHook();

    expect(result.current.isOpen).toBe(false);
  });

  test('renders the drawer open', () => {
    const { result } = renderShoppingCartDrawerHook({ initialIsOpen: true });

    expect(result.current.isOpen).toBe(true);
  });

  test('renders the drawer closed', () => {
    const { result } = renderShoppingCartDrawerHook({ initialIsOpen: false });

    expect(result.current.isOpen).toBe(false);
  });
});

describe('Closed Drawer', () => {
  test('opening the drawer opens it', async () => {
    const { result } = renderShoppingCartDrawerHook({ initialIsOpen: false });

    act(() => result.current.openDrawer());

    expect(result.current.isOpen).toBe(true);
  });

  test('closing the drawer does nothing', async () => {
    const { result } = renderShoppingCartDrawerHook({ initialIsOpen: false });

    act(() => result.current.closeDrawer());

    expect(result.current.isOpen).toBe(false);
  });
});

describe('Open Drawer', () => {
  test('closing the drawer closes it', async () => {
    const { result } = renderShoppingCartDrawerHook({ initialIsOpen: true });

    act(() => result.current.closeDrawer());

    expect(result.current.isOpen).toBe(false);
  });

  test('opening the drawer does nothing', async () => {
    const { result } = renderShoppingCartDrawerHook({ initialIsOpen: true });

    act(() => result.current.openDrawer());

    expect(result.current.isOpen).toBe(true);
  });
});

function renderShoppingCartDrawerHook(props: Partial<ShoppingCartDrawerProviderProps> = {}) {
  return renderHook(() => useShoppingCartDrawer(), {
    wrapper: ({ children }) => (
      <ShoppingCartDrawerProvider {...props}>{children}</ShoppingCartDrawerProvider>
    ),
  });
}
