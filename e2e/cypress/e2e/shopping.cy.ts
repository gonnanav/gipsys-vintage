import { Product } from '@/core/product';
import { header, shoppingCart, productPage } from '../support/page-objects';
import { testData } from '../support/helpers';

describe('Shopping Journey', () => {
  it('adds and removes items from the shopping cart', () => {
    const sampleProducts = testData.getSampleProducts().slice(0, 2);

    testData.seedProducts(sampleProducts).then((products) => {
      cy.visit('/');
      header.openShoppingCart();
      verifyCartIsEmpty();

      productPage.visit(products[0]);
      productPage.addToCart();
      header.openShoppingCart();
      verifyItemsInCart([products[0]]);

      productPage.visit(products[1]);
      productPage.addToCart();
      header.openShoppingCart();
      verifyItemsInCart([products[0], products[1]]);

      shoppingCart.removeItem(products[0]);
      verifyItemsInCart([products[1]]);

      shoppingCart.removeItem(products[1]);
      verifyCartIsEmpty();
    });
  });
});

function verifyCartIsEmpty(): void {
  shoppingCart.getItems().should('not.exist');
}

function verifyItemsInCart(expectedItems: Product[]): void {
  shoppingCart.getItems().should('have.length', expectedItems.length);

  shoppingCart.getItems().each((item, index) => {
    cy.wrap(item).within(() => {
      const { name, price } = expectedItems[index];
      cy.contains(name).should('be.visible');
      cy.contains(price).should('be.visible');
    });
  });
}
