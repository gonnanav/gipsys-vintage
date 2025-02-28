import { Product, ProductCreate } from '@/core/product';
import {
  WooCommerceProduct,
  WooCommerceProductInput,
  fromWooCommerceProduct,
  toWooCommerceProductInput,
} from './product';

it('maps WooCommerceProduct to Product', () => {
  const wcProduct: WooCommerceProduct = {
    id: 1,
    name: 'Test Product',
    slug: 'test-product',
    regular_price: '100',
    description: 'Test description',
    images: [],
    categories: [{ id: 1, name: 'Test Category', slug: 'test-category' }],
  };
  const expectedProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: '100',
    slug: 'test-product',
    description: 'Test description',
    images: [],
    categoryId: 1,
  };
  const product = fromWooCommerceProduct(wcProduct);

  expect(product).toEqual(expectedProduct);
});

it('maps ProductCreate to WooCommerceProductInput', () => {
  const productCreate: ProductCreate = {
    name: 'Test Product',
    price: '100',
    description: 'Test description',
    images: [],
    categoryId: 1,
  };
  const expectedWcProductInput: WooCommerceProductInput = {
    regular_price: '100',
    name: 'Test Product',
    description: 'Test description',
    images: [],
    categories: [{ id: 1 }],
  };
  const wcProductInput = toWooCommerceProductInput(productCreate);

  expect(wcProductInput).toEqual(expectedWcProductInput);
});
