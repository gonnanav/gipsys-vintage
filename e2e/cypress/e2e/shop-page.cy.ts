import { NewProduct, Product } from '@/application';

describe('Shop Page', () => {
  it('displays list of products and navigates to product page when clicking it', () => {
    const newProducts: NewProduct[] = [
      { name: 'product1', price: '100' },
      { name: 'product2', price: '50' },
    ];

    cy.task('seed:products', newProducts).as('products');
    cy.visit('/shop');

    cy.get('h1').contains('חנות').should('be.visible');

    cy.get<Product[]>('@products').then((products) => {
      // Check that all products are displayed
      products.forEach((product) => {
        cy.contains(product.name).should('be.visible');
        cy.contains(product.price).should('be.visible');
      });

      // Click the first product and check that it navigates to its page
      const firstProduct = products[0];
      cy.contains(firstProduct.name).click();
      cy.location('pathname').should('eq', `/shop/${firstProduct.slug}`);
    });
  });
});
