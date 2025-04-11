import { createProduct, placeholderImage, ProductInput } from './product';

// A dummy product input to satisfy the minimal required properties
const dummyProductInput: ProductInput = {
  id: 1,
  name: 'Dummy Product',
  slug: 'dummy-product',
  price: '10',
};

test.each([
  { property: 'id', value: 10 },
  { property: 'name', value: 'Test Product' },
  { property: 'slug', value: 'test-product' },
  { property: 'price', value: '100' },
  { property: 'description', value: 'Test description' },
  { property: 'images', value: [{ src: '/image.webp', alt: 'Some image' }] },
])(
  'creates a product with the given value for the $property property',
  ({ property, value }: { property: string; value: unknown }) => {
    const product = createProduct({
      ...dummyProductInput,
      [property]: value,
    });

    expect(product).toHaveProperty(property, value);
  },
);

test.each([
  { property: 'description', defaultValue: '' },
  { property: 'images', defaultValue: [] },
])(
  'creates a product with a default value for the optional $property property',
  ({ property, defaultValue }: { property: string; defaultValue: unknown }) => {
    const product = createProduct(dummyProductInput);

    expect(product).toHaveProperty(property, defaultValue);
  },
);

test('the first product image is the main image of the product', () => {
  const firstImage = { src: '/first.webp', alt: 'First image' };
  const secondImage = { src: '/second.webp', alt: 'Second image' };

  const product = createProduct({
    ...dummyProductInput,
    images: [firstImage, secondImage],
  });

  expect(product.mainImage).toBe(firstImage);
});

test('the placeholder image is the main image of the product if it has no images', () => {
  const product = createProduct({
    ...dummyProductInput,
    images: [],
  });

  expect(product.mainImage).toBe(placeholderImage);
});

test('the formatted price of the product is in shekels', () => {
  const product = createProduct({
    ...dummyProductInput,
    price: '100',
  });

  expect(product.formattedPrice).toBe('₪100');
});
