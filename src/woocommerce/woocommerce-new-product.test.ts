import { WooCommerceNewProduct } from './woocommerce-new-product';
import { NewProduct } from '@/core/product';

it('creates a WooCommerce product corresponding to the domain product', () => {
  const newProduct: NewProduct = {
    name: 'Test Product',
    price: '19.99',
    description: 'A test product description',
    images: [],
  };

  const expected = {
    name: 'Test Product',
    regular_price: '19.99',
    description: 'A test product description',
    images: [],
  };

  expect(new WooCommerceNewProduct(newProduct)).toEqual(expected);
});

it('creates an array of WooCommerce products corresponding to the domain products', () => {
  const newProducts: NewProduct[] = [
    {
      name: 'Product 1',
      price: '10.00',
      description: 'Description 1',
      images: [],
    },
    {
      name: 'Product 2',
      price: '20.00',
      description: 'Description 2',
      images: [],
    },
  ];

  const expected = [
    {
      name: 'Product 1',
      regular_price: '10.00',
      description: 'Description 1',
      images: [],
    },
    {
      name: 'Product 2',
      regular_price: '20.00',
      description: 'Description 2',
      images: [],
    },
  ];

  expect(WooCommerceNewProduct.fromDomain(newProducts)).toEqual(expected);
});
