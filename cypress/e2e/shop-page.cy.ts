const products = [{ name: 'product1' }, { name: 'product2' }];

describe('Shop Page', () => {
  beforeEach(() => {
    cy.task('reset:products');
    cy.task('seed:products', products);
  });

  it('displays the list of products', () => {
    cy.visit('/shop');

    products.forEach((product) => {
      cy.contains(product.name).should('be.visible');
    });
  });
});
