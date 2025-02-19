import { NewProduct, Product } from '@/application';

const productCard = '[data-testid="product-card"]';
const productCardImage = '[data-testid="product-card-image"]';

describe('Shop Page', () => {
  it('displays all products and navigates to product page when clicking product', () => {
    const productsToSeed: NewProduct[] = [
      { name: 'product1', price: '100' },
      { name: 'product2', price: '50' },
    ];

    cy.task<Product[]>('seed:products', productsToSeed).then((products) => {
      cy.visit('shop');

      cy.contains('h1', 'חנות').should('be.visible');
      cy.get(productCard).should('have.length', products.length);

      products.forEach((product) => {
        cy.contains(productCard, product.name).within(() => {
          cy.contains(product.name).should('be.visible');
          cy.contains(product.price).should('be.visible');
          cy.get(productCardImage).should('be.visible');
        });
      });

      const arbitraryProduct = products[0];
      cy.contains(arbitraryProduct.name).click();
      cy.location('pathname').should('eq', `/shop/${arbitraryProduct.slug}`);
    });
  });
});
