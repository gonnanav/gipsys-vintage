import { Product, ProductCreate } from '@/core/product';
import { Category, CategoryCreate } from '@/core/category';

const productCard = '[data-testid="product-card"]';
const productCardImage = '[data-testid="product-card-image"]';

describe('Shop Page', () => {
  it('displays all products and navigates to product page when clicking product', () => {
    const productsToSeed: ProductCreate[] = [
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
      cy.location('pathname').should('eq', `/product/${arbitraryProduct.slug}`);
    });
  });

  it('displays products filtered by category when visiting category page', () => {
    const categoriesToSeed: CategoryCreate[] = [
      { name: 'Pants', slug: 'pants' },
      { name: 'Shirts', slug: 'shirts' },
    ];

    // First seed categories to get their IDs
    cy.task<Category[]>('seed:categories', categoriesToSeed).then((categories) => {
      const pantsCategory = categories.find((c) => c.slug === 'pants')!;
      const shirtsCategory = categories.find((c) => c.slug === 'shirts')!;

      const productsToSeed: ProductCreate[] = [
        { name: 'Blue Jeans', price: '200', categoryId: pantsCategory.id },
        { name: 'Black Pants', price: '180', categoryId: pantsCategory.id },
        { name: 'White T-Shirt', price: '80', categoryId: shirtsCategory.id },
      ];

      // Then seed products with the correct category IDs
      cy.task<Product[]>('seed:products', productsToSeed).then((products) => {
        // Visit the pants category page
        cy.visit(`shop/category/${pantsCategory.slug}`);

        // Verify we're on the correct category page
        cy.contains('h1', pantsCategory.name).should('be.visible');

        // Should only show products from the pants category
        const pantsProducts = products.filter((p) => p.categoryId === pantsCategory.id);
        cy.get(productCard).should('have.length', pantsProducts.length);

        // Verify each pants product is displayed
        pantsProducts.forEach((product) => {
          cy.contains(productCard, product.name).within(() => {
            cy.contains(product.name).should('be.visible');
            cy.contains(product.price).should('be.visible');
            cy.get(productCardImage).should('be.visible');
          });
        });

        // Verify shirts are not shown
        const shirtProduct = products.find((p) => p.categoryId === shirtsCategory.id);
        cy.contains(shirtProduct.name).should('not.exist');
      });
    });
  });
});
