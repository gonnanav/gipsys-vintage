import { NewProduct, Product } from '@/application';

describe('Shop Page', () => {
  it('displays the list of products', () => {
    const newProducts: NewProduct[] = [
      { name: 'product1' },
      { name: 'product2' },
    ];

    cy.task('seed:products', newProducts).as('products');
    cy.visit('/shop');

    cy.get<Product[]>('@products').then((products) => {
      products.forEach((product) => {
        cy.contains(product.name).should('be.visible');
      });
    });
  });
});
