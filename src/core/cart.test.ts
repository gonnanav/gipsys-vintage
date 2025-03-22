import { addItemToCart, removeItemFromCart } from './cart';
import { leatherJacket, cottonScarf, puffSleeveTop } from '@/fixtures/products';

describe('Empty Cart', () => {
  it('adds an item', () => {
    const cart = addItemToCart([], leatherJacket);

    expect(cart).toEqual([leatherJacket]);
  });

  it('stays empty when removing an item', () => {
    const cart = removeItemFromCart([], 999);

    expect(cart).toEqual([]);
  });
});

describe('Non-empty Cart', () => {
  it('adds an item', () => {
    const cart = addItemToCart([cottonScarf], leatherJacket);

    expect(cart).toEqual([cottonScarf, leatherJacket]);
  });

  it('does not add the same item twice', () => {
    const cart = addItemToCart([cottonScarf], cottonScarf);

    expect(cart).toEqual([cottonScarf]);
  });

  it('removes an item from the cart', () => {
    const cart = removeItemFromCart([cottonScarf, leatherJacket, puffSleeveTop], leatherJacket.id);

    expect(cart).toEqual([cottonScarf, puffSleeveTop]);
  });

  it('stays the same when removing an item that is not in the cart', () => {
    const cart = removeItemFromCart([leatherJacket], 999);

    expect(cart).toEqual([leatherJacket]);
  });
});
