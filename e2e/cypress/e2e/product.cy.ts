import { header, productPage, data } from '../support/helpers';

describe('Product Page', () => {
  it('displays the product details and image gallery', () => {
    data.seedProduct(data.sampleProducts[0]).then((product) => {
      const { name, price, description } = product;

      productPage.visit(product);

      header.getLogo().should('be.visible');

      cy.getPageHeading(name).should('be.visible');
      cy.contains(price).should('be.visible');
      cy.contains(description).should('be.visible');
      productPage.getGallery().should('be.visible');
    });
  });
});
