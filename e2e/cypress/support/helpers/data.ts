import { Category } from '@/core/category';
import { CategoryCreate } from '@/core/category';
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

export function seedCategories(categories: CategoryCreate[]): Cypress.Chainable<Category[]> {
  return cy.task<Category[]>('seed:categories', categories);
}

export const shirtsCategory: CategoryCreate = {
  name: 'Shirts',
  slug: 'shirts',
};

export const pantsCategory: CategoryCreate = {
  name: 'Pants',
  slug: 'pants',
};

export function createProduct(name: string, category: Category): ProductCreate {
  return {
    name,
    price: '100',
    description: 'A product description',
    categoryId: category.id,
  };
}
