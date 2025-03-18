import { Product, ProductCreate } from '@/core/product';

/**
 * Seed a single product
 * @param product The product data to seed
 * @returns A Cypress chain that resolves to the seeded product
 */
export function seedProduct(product: ProductCreate): Cypress.Chainable<Product> {
  return cy.task<Product>('seed:product', product);
}

/**
 * Seed multiple products
 * @param products The product data to seed
 * @returns A Cypress chain that resolves to the seeded products
 */
export function seedProducts(products: ProductCreate[]): Cypress.Chainable<Product[]> {
  return cy.task<Product[]>('seed:products', products);
}

export const sampleProducts = [
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
  {
    name: 'Retro Sunglasses',
    price: '89',
    description: 'Iconic 60s style sunglasses with UV protection',
  },
];
