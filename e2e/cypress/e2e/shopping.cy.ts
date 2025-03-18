import { Product } from '@/core/product';
import { header, shoppingCart, shopPage, productPage } from '../support/page-objects';
import { testData } from '../support/helpers';

describe('Shopping Journey', () => {
  it('adds and removes items from the shopping cart', () => {
    const sampleProducts = testData.getSampleProducts().slice(0, 2);

    testData.seedProducts(sampleProducts).then((products) => {
      shopPage.visit();
      header.openShoppingCart();
      verifyThatCartIsEmpty();
      shoppingCart.close();

      shopPage.goToProduct(products[0]);
      productPage.addToShoppingCart();
      verifyThatItemsInCartAre([products[0]]);

      shoppingCart.removeItem(products[0]);
      verifyThatCartIsEmpty();
    });
  });
});

function verifyThatCartIsEmpty(): void {
  shoppingCart.getItems().should('not.exist');
}

function verifyThatItemsInCartAre(expectedItems: Product[]): void {
  shoppingCart.getItems().should('have.length', expectedItems.length);

  expectedItems.forEach(({ name }, index) => {
    shoppingCart.getItems().eq(index).contains(name).should('be.visible');
  });
}
