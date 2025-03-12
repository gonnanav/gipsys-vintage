import { Product } from '@/core/product';
import { shoppingCart, productPage } from '../../support/page-objects';
import { testData } from '../../support/helpers';

const sampleProducts = testData.getSampleProducts().slice(0, 2);

describe('Shopping Journey', () => {
  it('updates items in the shopping cart', () => {
    testData.seedProducts(sampleProducts).then((products) => {
      cy.visit('/');
      verifyCartIsEmpty();

      addProductToCart(products[0]);
      verifyItemsInCart([products[0]]);

      addProductToCart(products[1]);
      verifyItemsInCart([products[0], products[1]]);
    });
  });
});

function addProductToCart(product: Product): void {
  productPage.visit(product);
  productPage.addToCart();
}

function verifyCartIsEmpty(): void {
  shoppingCart.open();

  shoppingCart.getItems().should('not.exist');
  shoppingCart.getEmptyMessage().should('be.visible');
}

function verifyItemsInCart(expectedItems: Product[]): void {
  shoppingCart.open();

  shoppingCart.getItems().should('have.length', expectedItems.length);

  shoppingCart.getItems().each((item, index) => {
    cy.wrap(item).within(() => {
      const { name, price } = expectedItems[index];
      cy.contains(name).should('be.visible');
      cy.contains(price).should('be.visible');
      cy.getByTestId('shopping-cart-item-image').should('be.visible');
    });
  });
}
