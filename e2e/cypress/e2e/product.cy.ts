import { Product, ProductCreate } from '@/core/product';
import { header, productPage } from '../support/helpers';

describe('Product Page', () => {
  it('displays the product details and image gallery', () => {
    const productToSeed: ProductCreate = {
      name: 'product1',
      price: '100',
      description: 'A vintage dress from the 80s',
    };

    cy.task<Product>('seed:product', productToSeed).then((product) => {
      const { name, price, description } = product;

      productPage.visit(product);

      header.getLogo().should('be.visible');

      cy.getPageHeading(name).should('be.visible');
      cy.contains(price).should('be.visible');
      cy.contains(description).should('be.visible');
      productPage.getGallery().should('be.visible');
    });
  });

  it('displays 404 page when requesting invalid product slug', () => {
    const url = 'product/non-existent';

    cy.request({ url, failOnStatusCode: false }).its('status').should('equal', 404);
    cy.visit(url, { failOnStatusCode: false });

    header.getLogo().should('be.visible');
  });
});
