import { Product, NewProduct } from '@/core/product';
import { WooCommerceApi } from './api';
import { WooCommerceAdapter } from './adapter';

let api: jest.Mocked<WooCommerceApi>;
let adapter: WooCommerceAdapter;

beforeEach(() => {
  api = { fetch: jest.fn().mockResolvedValue([]) };
  adapter = new WooCommerceAdapter(api);
});

describe('getProduct', () => {
  it('calls api.fetch with products endpoint and product slug', async () => {
    const slug = 'test-product';

    await adapter.getProduct(slug);

    expect(api.fetch).toHaveBeenCalledWith('products', {
      searchParams: { slug },
    });
  });

  it('returns null when the api returns empty array', async () => {
    const slug = 'non-existent-product';
    api.fetch.mockResolvedValue([]);

    const product = await adapter.getProduct(slug);

    expect(product).toBeNull();
  });

  it('returns the first product returned from the api', async () => {
    const slug = 'test-product';
    const wcProducts: Product[] = [
      {
        id: 1,
        name: 'Test Product 1',
        price: '100',
        slug,
      },
      {
        id: 2,
        name: 'Test Product 2',
        price: '200',
        slug,
      },
    ];
    api.fetch.mockResolvedValue(wcProducts);

    const product = await adapter.getProduct(slug);

    expect(product).toEqual(wcProducts[0]);
  });
});

describe('getProducts', () => {
  it('calls api.fetch with products endpoint', async () => {
    await adapter.getProducts();

    expect(api.fetch).toHaveBeenCalledWith('products');
  });

  it('returns all products returned from the api', async () => {
    const wcProducts: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        slug: 'product-1',
        price: '100',
        description: 'Description 1',
      },
      {
        id: 2,
        name: 'Product 2',
        slug: 'product-2',
        price: '200',
        description: 'Description 2',
      },
    ];
    api.fetch.mockResolvedValue(wcProducts);

    const products = await adapter.getProducts();

    expect(products).toEqual(wcProducts);
  });
});

describe('replaceAllProducts', () => {
  it('calls api.fetch with products/batch endpoint', async () => {
    const existingWcProducts: Product[] = [
      { id: 1, name: 'Product 1', slug: 'product-1', price: '100' },
      { id: 2, name: 'Product 2', slug: 'product-2', price: '200' },
    ];
    const newProducts: NewProduct[] = [
      { name: 'New Product 1', price: '300' },
      { name: 'New Product 2', price: '400' },
    ];
    const newWcProducts = [
      { name: 'New Product 1', regular_price: '300' },
      { name: 'New Product 2', regular_price: '400' },
    ];

    api.fetch.mockResolvedValue(existingWcProducts);
    await adapter.replaceAllProducts(newProducts);

    expect(api.fetch).toHaveBeenCalledWith('products/batch', {
      method: 'POST',
      body: {
        delete: [1, 2],
        create: newWcProducts,
      },
    });
  });
});
