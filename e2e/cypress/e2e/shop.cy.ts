import { Product, ProductCreate } from '@/core/product';
import { Category } from '@/core/category';
import { shopPage, data } from '../support/helpers';
import { createProduct } from '../support/helpers/data';

describe('Shop Page', () => {
  let shirtsCategory: Category;
  let pantsCategory: Category;
  let whiteTShirt: Product;
  let blueJeans: Product;
  let blackPants: Product;
  let products: Product[] = [];

  before(() => {
    data.seedCategories([data.shirtsCategory, data.pantsCategory]).then((categories) => {
      [shirtsCategory, pantsCategory] = categories;

      const sampleProducts: ProductCreate[] = [
        createProduct('White T-Shirt', shirtsCategory),
        createProduct('Blue Jeans', pantsCategory),
        createProduct('Black Pants', pantsCategory),
      ];

      data.seedProducts(sampleProducts).then((ps) => {
        products = ps;
        [whiteTShirt, blueJeans, blackPants] = ps;
      });
    });
  });

  it('displays all products and navigates to product page when clicking product', () => {
    visitShopPage();

    verifyThatShopTitleIs('חנות');
    verifyThatProductsInShopAre(products);
  });

  it('displays products filtered by category when visiting category page', () => {
    visitCategory(pantsCategory);

    verifyThatShopTitleIs(pantsCategory.name);
    verifyThatProductsInShopAre([blueJeans, blackPants]);
    verifyThatProductIsNotInShop(whiteTShirt);
  });
});

function visitShopPage(): void {
  shopPage.visit();
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
