import { Product, NewProduct } from '@/core/product';

describe('Product Page', () => {
  it('displays the product details and image gallery', () => {
    const productToSeed: NewProduct = {
      name: 'product1',
      price: '100',
      description: 'A vintage dress from the 80s',
    };

    cy.task<Product[]>('seed:products', [productToSeed]).then(([product]) => {
      cy.visit(`product/${product.slug}`);

      cy.contains(product.name).should('be.visible');
      cy.contains(product.price).should('be.visible');
      cy.contains(product.description).should('be.visible');
      cy.get('[data-testid="product-gallery"]').should('be.visible');
    });
  });

  it('displays 404 page when requesting invalid product slug', () => {
    const url = 'product/non-existent';

    cy.request({ url, failOnStatusCode: false }).its('status').should('equal', 404);
    cy.visit(url, { failOnStatusCode: false });
  });
});
