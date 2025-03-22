import { Product } from './product';

export function addItemToCart(cart: Product[], item: Product): Product[] {
  if (cart.some((cartItem) => cartItem.id === item.id)) {
    return cart;
  }

  return [...cart, item];
}

export function removeItemFromCart(cart: Product[], itemId: number): Product[] {
  return cart.filter((cartItem) => cartItem.id !== itemId);
}
