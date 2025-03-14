import { Product } from '@/core/product';
import { header, shoppingCart, productPage } from '../support/page-objects';
import { testData } from '../support/helpers';

describe('Shopping Journey', () => {
  it('adds and removes items from the shopping cart', () => {
    const sampleProducts = testData.getSampleProducts().slice(0, 2);

    testData.seedProducts(sampleProducts).then((products) => {
      cy.visit('/');
      header.clickShoppingCartButton();
      verifyCartIsEmpty();

      addItemToCart(products[0]);
      header.clickShoppingCartButton();
      verifyItemsInCart([products[0]]);

      addItemToCart(products[1]);
      header.clickShoppingCartButton();
      verifyItemsInCart([products[0], products[1]]);

      removeItemFromCart(products[0]);
      verifyItemsInCart([products[1]]);

      removeItemFromCart(products[1]);
      verifyCartIsEmpty();
    });
  });
});

function addItemToCart(item: Product): void {
  productPage.visit(item);
  productPage.addToCart();
}

function removeItemFromCart(item: Product): void {
  shoppingCart.clickRemoveItemButton(item);
}

function verifyCartIsEmpty(): void {
  shoppingCart.getItems().should('not.exist');
  shoppingCart.getEmptyCartMessage().should('be.visible');
}

function verifyItemsInCart(expectedItems: Product[]): void {
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
