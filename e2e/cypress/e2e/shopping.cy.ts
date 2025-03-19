import { Product, ProductCreate } from '@/core/product';
import { Category } from '@/core/category';
import { header, cart, shopPage, productPage, data } from '../support/helpers';
import { createProduct } from '../support/helpers/data';

describe('Shopping Journey', () => {
  let shirtsCategory: Category;
  let pantsCategory: Category;
  let whiteTShirt: Product;
  let blueJeans: Product;
  let blackPants: Product;

  before(() => {
    data
      .seedCategories([data.shirtsCategory, data.pantsCategory])
      .then((categories) => {
        [shirtsCategory, pantsCategory] = categories;

        const sampleProducts: ProductCreate[] = [
          createProduct('White T-Shirt', shirtsCategory),
          createProduct('Blue Jeans', pantsCategory),
          createProduct('Black Pants', pantsCategory),
        ];

        return data.seedProducts(sampleProducts);
      })
      .then((products) => {
        [whiteTShirt, blueJeans, blackPants] = products;
      });
  });

  it('shops for a product', () => {
    visitShopPage();
    verifyThatShopTitleIs('חנות');
    verifyThatProductsInShopAre([whiteTShirt, blueJeans, blackPants]);

    goToProduct(whiteTShirt);
    verifyThatProductDisplayedIs(whiteTShirt);

    addProductToCart();
    verifyThatItemsInCartAre([whiteTShirt]);
  });

  it('shops by category', () => {
    visitCategory(pantsCategory);

    verifyThatShopTitleIs(pantsCategory.name);
    verifyThatProductsInShopAre([blueJeans, blackPants]);
    verifyThatProductIsNotInShop(whiteTShirt);
  });

  it('adds and removes a product from the cart', () => {
    visitProductPage(whiteTShirt);

    openCart();
    verifyThatCartIsEmpty();
    closeCart();

    addProductToCart();
    verifyThatItemsInCartAre([whiteTShirt]);

    removeItemFromCart(whiteTShirt);
    verifyThatCartIsEmpty();
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

function visitCategory(category: Category): void {
  shopPage.visitCategory(category);
}

function verifyThatShopTitleIs(title: string): void {
  cy.getPageHeading(title).should('be.visible');
}

function verifyThatProductsInShopAre(products: Product[]): void {
  shopPage.getProducts().should('have.length', products.length);

  products.forEach((product) => {
    shopPage.getProduct(product.name).within(() => {
      cy.contains(product.name).should('be.visible');
      cy.contains(product.price).should('be.visible');
      cy.getByTestId('product-card-image').should('be.visible');
    });
  });
}

function verifyThatProductIsNotInShop(product: Product): void {
  shopPage.getProduct(product.name).should('not.exist');
}
