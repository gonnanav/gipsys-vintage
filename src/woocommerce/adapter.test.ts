import { Product, NewProduct } from '@/core/product';
import { WooCommerceApi } from './api';
import { WooCommerceAdapter } from './adapter';
import { WooCommerceProduct, WooCommerceProductInput } from './product';

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

  it('returns the product matching the first product returned from the api', async () => {
    const slug = 'test-product';
    const wcProducts: WooCommerceProduct[] = [
      {
        id: 1,
        name: 'Test Product 1',
        regular_price: '100',
        slug,
        description: '',
        images: [],
      },
      {
        id: 2,
        name: 'Test Product 2',
        regular_price: '200',
        slug,
        description: '',
        images: [],
      },
    ];
    const expectedProduct: Product = {
      id: 1,
      name: 'Test Product 1',
      price: '100',
      slug,
      description: '',
      images: [],
    };
    api.fetch.mockResolvedValue(wcProducts);

    const product = await adapter.getProduct(slug);

    expect(product).toEqual(expectedProduct);
  });
});

describe('getProducts', () => {
  it('calls api.fetch with products endpoint', async () => {
    await adapter.getProducts();

    expect(api.fetch).toHaveBeenCalledWith('products');
  });

  it('returns products matching all products returned from the api', async () => {
    const wcProducts: WooCommerceProduct[] = [
      {
        id: 1,
        name: 'Product 1',
        slug: 'product-1',
        regular_price: '100',
        description: 'Description 1',
        images: [],
      },
      {
        id: 2,
        name: 'Product 2',
        slug: 'product-2',
        regular_price: '200',
        description: 'Description 2',
        images: [],
      },
    ];
    const expectedProducts: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        price: '100',
        slug: 'product-1',
        description: 'Description 1',
        images: [],
      },
      {
        id: 2,
        name: 'Product 2',
        price: '200',
        slug: 'product-2',
        description: 'Description 2',
        images: [],
      },
    ];
    api.fetch.mockResolvedValue(wcProducts);

    const products = await adapter.getProducts();

    expect(products).toEqual(expectedProducts);
  });
});

describe('replaceAllProducts', () => {
  it('calls api.fetch with products/batch endpoint', async () => {
    const existingWcProducts: WooCommerceProduct[] = [
      {
        id: 1,
        name: 'Product 1',
        slug: 'product-1',
        regular_price: '100',
        description: '',
        images: [],
      },
      {
        id: 2,
        name: 'Product 2',
        slug: 'product-2',
        regular_price: '200',
        description: '',
        images: [],
      },
    ];
    const newProducts: NewProduct[] = [
      { name: 'New Product 1', price: '300' },
      { name: 'New Product 2', price: '400' },
    ];
    const newWcProducts: WooCommerceProductInput[] = [
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
