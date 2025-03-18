import { Product } from '@/core/product';
import { header, cart, shopPage, productPage, data } from '../support/helpers';

describe('Shopping Journey', () => {
  it('adds and removes items from the cart', () => {
    data.seedProducts(data.sampleProducts).then((products) => {
      visitShopPage();
      openCart();
      verifyThatCartIsEmpty();
      closeCart();

      goToProduct(products[0]);
      addProductToCart();
      verifyThatItemsInCartAre([products[0]]);

      removeItemFromCart(products[0]);
      verifyThatCartIsEmpty();
    });
  });
});

function visitShopPage(): void {
  shopPage.visit();
}

function openCart(): void {
  header.openShoppingCart();
}

function closeCart(): void {
  cart.close();
}

function goToProduct(product: Product): void {
  shopPage.goToProduct(product);
}

function addProductToCart(): void {
  productPage.addToShoppingCart();
}

function removeItemFromCart(product: Product): void {
  cart.removeItem(product);
}

function verifyThatCartIsEmpty(): void {
  cart.getItems().should('not.exist');
}

function verifyThatItemsInCartAre(expectedItems: Product[]): void {
  cart.getItems().should('have.length', expectedItems.length);

  expectedItems.forEach(({ name }, index) => {
    cart.getItems().eq(index).contains(name).should('be.visible');
  });
}
