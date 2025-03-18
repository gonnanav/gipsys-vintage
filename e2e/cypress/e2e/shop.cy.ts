import { Product, ProductCreate } from '@/core/product';
import { Category, CategoryCreate } from '@/core/category';
import * as shopPage from '../support/page-objects/shop-page';

describe('Shop Page', () => {
  it('displays all products and navigates to product page when clicking product', () => {
    const productsToSeed: ProductCreate[] = [
      { name: 'product1', price: '100' },
      { name: 'product2', price: '50' },
    ];

    cy.task<Product[]>('seed:products', productsToSeed).then((products) => {
      shopPage.visit();

      cy.getAppHeader().should('be.visible');

      cy.getPageHeading('חנות').should('be.visible');
      shopPage.getProducts().should('have.length', products.length);

      products.forEach((product) => {
        shopPage.getProduct(product.name).within(() => {
          cy.contains(product.name).should('be.visible');
          cy.contains(product.price).should('be.visible');
          cy.getByTestId('product-card-image').should('be.visible');
        });
      });

      const arbitraryProduct = products[0];
      shopPage.goToProduct(arbitraryProduct);
      cy.location('pathname').should('eq', `/product/${arbitraryProduct.slug}`);
    });
  });

  it('displays products filtered by category when visiting category page', () => {
    const categoriesToSeed: CategoryCreate[] = [
      { name: 'Pants', slug: 'pants' },
      { name: 'Shirts', slug: 'shirts' },
    ];

    cy.task<Category[]>('seed:categories', categoriesToSeed).then((categories) => {
      const pantsCategory = categories.find((c) => c.slug === 'pants')!;
      const shirtsCategory = categories.find((c) => c.slug === 'shirts')!;

      const productsToSeed: ProductCreate[] = [
        { name: 'Blue Jeans', price: '200', categoryId: pantsCategory.id },
        { name: 'Black Pants', price: '180', categoryId: pantsCategory.id },
        { name: 'White T-Shirt', price: '80', categoryId: shirtsCategory.id },
      ];

      cy.task<Product[]>('seed:products', productsToSeed).then((products) => {
        shopPage.visitCategory(pantsCategory);

        cy.getAppHeader().should('be.visible');

        cy.getPageHeading(pantsCategory.name).should('be.visible');

        const pantsProducts = products.filter((p) => p.categoryId === pantsCategory.id);
        shopPage.getProducts().should('have.length', pantsProducts.length);

        pantsProducts.forEach((product) => {
          shopPage.getProduct(product.name).within(() => {
            cy.contains(product.name).should('be.visible');
            cy.contains(product.price).should('be.visible');
            cy.getByTestId('product-card-image').should('be.visible');
          });
        });

        const shirtProduct = products.find((p) => p.categoryId === shirtsCategory.id);
        shopPage.getProduct(shirtProduct.name).should('not.exist');
      });
    });
  });
});
