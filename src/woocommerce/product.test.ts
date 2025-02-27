import { WooCommerceProductInput, toWooCommerceProductInput } from './product';
import { NewProduct } from '@/core/product';

it('maps NewProduct to WooCommerceProductInput', () => {
  const product: NewProduct = {
    name: 'Test Product',
    price: '19.99',
    description: 'A test product description',
    images: [],
  };

  const expected: WooCommerceProductInput = {
    name: 'Test Product',
    regular_price: '19.99',
    description: 'A test product description',
    images: [],
  };

  expect(toWooCommerceProductInput(product)).toEqual(expected);
});
