import { Product } from '@/core/product';
import { header, cart, shopPage, productPage, data } from '../support/helpers';

describe('Shopping Journey', () => {
  let products: Product[] = [];

  before(() => {
    data.seedProducts(data.sampleProducts).then((ps) => {
      products = ps;
    });
  });

  it('shops for a product', () => {
    cy.wrap(products).then((products) => {
      visitShopPage();

      goToProduct(products[0]);
      verifyThatProductDisplayedIs(products[0]);

      addProductToCart();
      verifyThatItemsInCartAre([products[0]]);
    });
  });

  it('adds and removes a product from the cart', () => {
    cy.wrap(products).then((products) => {
      visitProductPage(products[0]);

      openCart();
      verifyThatCartIsEmpty();
      closeCart();

      addProductToCart();
      verifyThatItemsInCartAre([products[0]]);

      removeItemFromCart(products[0]);
      verifyThatCartIsEmpty();
    });
  });
});

function verifyThatProductDisplayedIs(product: Product): void {
  cy.getPageHeading(product.name).should('be.visible');
  cy.contains(product.price).should('be.visible');
  cy.contains(product.description).should('be.visible');
  productPage.getGallery().should('be.visible');
}

function visitShopPage(): void {
  shopPage.visit();
}

function visitProductPage(product: Product): void {
  productPage.visit(product);
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
