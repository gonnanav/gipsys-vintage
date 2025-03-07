import { Product, ProductCreate } from '@/core/product';

describe('Shopping Journey', () => {
  it('allows adding a product to the shopping cart', () => {
    const productToSeed: ProductCreate = {
      name: 'Vintage Leather Jacket',
      price: '299',
      description: 'Classic leather jacket from the 70s',
    };

    cy.task<Product>('seed:product', productToSeed).then((product) => {
      // Start at the product page
      cy.visit(`product/${product.slug}`);

      // Add to cart
      cy.getAddToCartButton().click();

      // Verify product appears in cart
      cy.getShoppingCartButton().click();
      cy.getShoppingCartModal().within(() => {
        cy.contains(product.name).should('be.visible');
        cy.contains(product.price).should('be.visible');
      });
    });
  });
});
