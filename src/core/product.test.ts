import { createProduct } from './product';

test('creating a product with the provided properties', () => {
  const input = {
    id: 10,
    name: 'Test Product',
    slug: 'test-product',
    price: '100',
    description: 'Test Description',
    images: [
      { src: '/image1.webp', alt: 'Image 1' },
      { src: '/image2.webp', alt: 'Image 2' },
    ],
  };
  const product = createProduct(input);

  expect(product).toMatchObject(input);
});

test('creating a product with defaults for optional properties', () => {
  const input = {
    id: 10,
    name: 'Test Product',
    slug: 'test-product',
    price: '100',
  };
  const product = createProduct(input);

  expect(product).toMatchObject({
    description: '',
    images: [],
  });
});

test('the first image is the main image', () => {
  const input = {
    id: 10,
    name: 'Test Product',
    slug: 'test-product',
    price: '100',
    images: [
      { src: '/image1.webp', alt: 'Image 1' },
      { src: '/image2.webp', alt: 'Image 2' },
    ],
  };
  const product = createProduct(input);

  expect(product).toMatchObject({
    mainImage: { src: '/image1.webp', alt: 'Image 1' },
  });
});

test('the placeholder image is the main image when there are no images', () => {
  const input = {
    id: 10,
    name: 'Test Product',
    slug: 'test-product',
    price: '100',
  };
  const product = createProduct(input);

  expect(product.mainImage).toMatchObject({ alt: 'אין תמונת מוצר' });
});
