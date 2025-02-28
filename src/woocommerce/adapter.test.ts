import { Product, ProductCreate } from '@/core/product';
import { WooCommerceApi } from './api';
import { WooCommerceAdapter } from './adapter';
import { WooCommerceProduct, WooCommerceProductInput } from './product';

let api: jest.Mocked<WooCommerceApi>;
let adapter: WooCommerceAdapter;

beforeEach(() => {
  api = {
    getProducts: jest.fn().mockResolvedValue([]),
    batchUpdateProducts: jest.fn().mockResolvedValue({}),
  };
  adapter = new WooCommerceAdapter(api);
});

describe('getProduct', () => {
  it('calls api getProducts with product slug', async () => {
    const slug = 'test-product';
    await adapter.getProduct(slug);

    expect(api.getProducts).toHaveBeenCalledWith({ slug });
  });

  it('returns null when the api returns empty array', async () => {
    const slug = 'non-existent-product';
    api.getProducts.mockResolvedValue([]);

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
    api.getProducts.mockResolvedValue(wcProducts);

    const product = await adapter.getProduct(slug);

    expect(product).toEqual(expectedProduct);
  });
});

describe('getProducts', () => {
  it('calls api getProducts with no arguments', async () => {
    await adapter.getProducts();

    expect(api.getProducts).toHaveBeenCalledWith();
  });

  it('returns matching products to all products returned from the api', async () => {
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
    api.getProducts.mockResolvedValue(wcProducts);

    const products = await adapter.getProducts();

    expect(products).toEqual(expectedProducts);
  });
});

describe('replaceAllProducts', () => {
  it('calls api batchUpdateProducts to delete existing products and create new ones', async () => {
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
    const newProducts: ProductCreate[] = [
      { name: 'New Product 1', price: '300' },
      { name: 'New Product 2', price: '400' },
    ];
    const newWcProducts: WooCommerceProductInput[] = [
      { name: 'New Product 1', regular_price: '300' },
      { name: 'New Product 2', regular_price: '400' },
    ];

    api.getProducts.mockResolvedValue(existingWcProducts);
    await adapter.replaceAllProducts(newProducts);

    expect(api.batchUpdateProducts).toHaveBeenCalledWith({
      delete: [1, 2],
      create: newWcProducts,
    });
  });
});
