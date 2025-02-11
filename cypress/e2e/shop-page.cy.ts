describe('Shop Page', () => {
  it('displays the list of products', () => {
    const products = [{ name: 'product1' }, { name: 'product2' }];

    cy.task('seed:products', products);
    cy.visit('/shop');

    products.forEach((product) => {
      cy.contains(product.name).should('be.visible');
    });
  });
});
