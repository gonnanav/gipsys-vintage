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

  it('displays and updates items in the shopping cart', () => {
    const productsToSeed: ProductCreate[] = [
      {
        name: 'Vintage Leather Jacket',
        price: '299',
        description: 'Classic leather jacket from the 70s',
      },
      {
        name: 'Denim Distressed Jeans',
        price: '199',
        description: 'Stylish high-waisted jeans with a vintage wash and distressed details',
      },
    ];

    cy.task<Product[]>('seed:products', productsToSeed).then((products) => {
      cy.visit('/');

      cy.getShoppingCartButton().click();
      cy.getShoppingCartModal().within(() => {
        cy.getShoppingCartItems().should('not.exist');

        cy.getShoppingCartEmptyMessage().should('be.visible');
      });

      cy.visit(`product/${products[0].slug}`);
      cy.getAddToCartButton().click();

      cy.getShoppingCartButton().click();
      cy.getShoppingCartModal().within(() => {
        cy.getShoppingCartItems().should('have.length', 1);

        cy.contains(products[0].name).should('be.visible');
        cy.contains(products[0].price).should('be.visible');
      });
      cy.getShoppingCartCloseButton().click();

      cy.visit(`product/${products[1].slug}`);
      cy.getAddToCartButton().click();

      cy.getShoppingCartButton().click();
      cy.getShoppingCartModal().within(() => {
        cy.getShoppingCartItems().should('have.length', 2);

        cy.contains(products[1].name).should('be.visible');
        cy.contains(products[1].price).should('be.visible');
      });
    });
  });
});
