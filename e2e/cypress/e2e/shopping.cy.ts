import { Product, ProductCreate } from '@/core/product';
import { Category } from '@/core/category';
import {
  header,
  cart,
  shopPage,
  productPage,
  data,
  homepage,
  navigationMenu,
} from '../support/helpers';
import { createProduct } from '../support/helpers/data';

describe('Shopping Journey', () => {
  beforeEach(() => {
    data
      .seedCategories([data.shirtsCategory, data.pantsCategory])
      .as('categories')
      .then((categories) => {
        const [shirtsCategory, pantsCategory] = categories;

        const sampleProducts: ProductCreate[] = [
          createProduct('White T-Shirt', shirtsCategory),
          createProduct('Blue Jeans', pantsCategory),
          createProduct('Black Pants', pantsCategory),
        ];

        data.seedProducts(sampleProducts).as('products');
      });
  });

  it('shops for a product', function () {
    const [whiteTShirt, blueJeans, blackPants] = this.products;

    visitHomePage();
    goToShopPage();
    verifyThatShopTitleIs('חנות');
    verifyThatProductsInShopAre([whiteTShirt, blueJeans, blackPants]);

    goToProduct(whiteTShirt);
    verifyThatProductDisplayedIs(whiteTShirt);

    addProductToCart();
    verifyThatItemsInCartAre([whiteTShirt]);
  });

  it('shops by category', function () {
    const [, pantsCategory] = this.categories;
    const [whiteTShirt, blueJeans, blackPants] = this.products;

    visitHomePage();

    goToCategory(pantsCategory);
    verifyThatShopTitleIs(pantsCategory.name);
    verifyThatProductsInShopAre([blueJeans, blackPants]);
    verifyThatProductIsNotInShop(whiteTShirt);
  });
});

function verifyThatProductDisplayedIs(product: Product): void {
  cy.findByRole('heading', { name: product.name }).should('be.visible');
  cy.contains(product.price).should('be.visible');
  cy.contains(product.description).should('be.visible');
  productPage.getGallery().should('be.visible');
}

function visitHomePage(): void {
  homepage.visit();
}

function goToShopPage(): void {
  homepage.goToShopPage();
}

function goToProduct(product: Product): void {
  shopPage.goToProduct(product);
}

function addProductToCart(): void {
  productPage.addToShoppingCart();
}

function verifyThatItemsInCartAre(expectedItems: Product[]): void {
  cart.getItems().should('have.length', expectedItems.length);

  expectedItems.forEach(({ name }, index) => {
    cart.getItems().eq(index).contains(name).should('be.visible');
  });
}

function goToCategory(category: Category): void {
  header.openNavigationMenu();
  navigationMenu.navigateToCategory(category);
}

function verifyThatShopTitleIs(title: string): void {
  cy.findByRole('heading', { name: title }).should('be.visible');
}

function verifyThatProductsInShopAre(products: Product[]): void {
  shopPage.getProducts().should('have.length', products.length);

  products.forEach((product) => {
    shopPage.getProduct(product.name).within(() => {
      cy.contains(product.name).should('be.visible');
      cy.contains(product.price).should('be.visible');
      cy.findByRole('img').should('be.visible');
    });
  });
}

function verifyThatProductIsNotInShop(product: Product): void {
  shopPage.getProduct(product.name).should('not.exist');
}
