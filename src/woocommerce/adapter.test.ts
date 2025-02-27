import { Product, NewProduct } from '@/core/product';
import { WooCommerceApi } from './api';
import { WooCommerceAdapter } from './adapter';

let mockApi: jest.Mocked<WooCommerceApi>;
let adapter: WooCommerceAdapter;

beforeEach(() => {
  mockApi = { fetch: jest.fn() } as jest.Mocked<WooCommerceApi>;
  adapter = new WooCommerceAdapter(mockApi);
});

describe('getProduct', () => {
  it('should return null when product is not found', async () => {
    mockApi.fetch.mockResolvedValue([]);

    const result = await adapter.getProduct('non-existent');

    expect(result).toBeNull();
    expect(mockApi.fetch).toHaveBeenCalledWith('products', {
      searchParams: new URLSearchParams({ slug: 'non-existent' }),
    });
  });

  it('should return first product when found', async () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      slug: 'test-product',
      price: '100',
      description: 'Test description',
    };
    mockApi.fetch.mockResolvedValue([mockProduct]);

    const result = await adapter.getProduct('test-product');

    expect(result).toEqual(mockProduct);
    expect(mockApi.fetch).toHaveBeenCalledWith('products', {
      searchParams: new URLSearchParams({ slug: 'test-product' }),
    });
  });

  it('should handle multiple products returned and take first one', async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Test Product 1',
        slug: 'test-product',
        price: '100',
        description: 'Test description 1',
      },
      {
        id: 2,
        name: 'Test Product 2',
        slug: 'test-product',
        price: '200',
        description: 'Test description 2',
      },
    ];
    mockApi.fetch.mockResolvedValue(mockProducts);

    const result = await adapter.getProduct('test-product');

    expect(result).toEqual(mockProducts[0]);
    expect(mockApi.fetch).toHaveBeenCalledWith('products', {
      searchParams: new URLSearchParams({ slug: 'test-product' }),
    });
  });
});

describe('getProducts', () => {
  it('should return empty array when no products exist', async () => {
    mockApi.fetch.mockResolvedValue([]);

    const result = await adapter.getProducts();

    expect(result).toEqual([]);
    expect(mockApi.fetch).toHaveBeenCalledWith('products');
  });

  it('should return all products', async () => {
    const mockProducts: Product[] = [
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
    mockApi.fetch.mockResolvedValue(mockProducts);

    const result = await adapter.getProducts();

    expect(result).toEqual(mockProducts);
    expect(mockApi.fetch).toHaveBeenCalledWith('products');
  });
});

describe('replaceAllProducts', () => {
  it('should delete old products and create new ones', async () => {
    const oldProducts: Product[] = [
      {
        id: 1,
        name: 'Old Product',
        slug: 'old-product',
        price: '100',
        description: 'Old description',
      },
    ];

    const newProducts: NewProduct[] = [
      {
        name: 'New Product',
        price: '200',
        description: 'New description',
      },
    ];

    const createdProducts: Product[] = [
      {
        id: 2,
        name: 'New Product',
        slug: 'new-product',
        price: '200',
        description: 'New description',
      },
    ];

    mockApi.fetch
      .mockResolvedValueOnce(oldProducts) // First call for getProducts
      .mockResolvedValueOnce({ create: createdProducts }); // Second call for batch update

    const result = await adapter.replaceAllProducts(newProducts);

    expect(result).toEqual(createdProducts);
    expect(mockApi.fetch).toHaveBeenCalledTimes(2);
    expect(mockApi.fetch).toHaveBeenNthCalledWith(1, 'products');
    expect(mockApi.fetch).toHaveBeenNthCalledWith(2, 'products/batch', {
      method: 'POST',
      body: {
        delete: [1],
        create: expect.any(Array),
      },
    });
  });

  it('should handle empty old products list', async () => {
    const oldProducts: Product[] = [];
    const newProducts: NewProduct[] = [
      {
        name: 'New Product',
        price: '200',
        description: 'New description',
      },
    ];
    const createdProducts: Product[] = [
      {
        id: 1,
        name: 'New Product',
        slug: 'new-product',
        price: '200',
        description: 'New description',
      },
    ];

    mockApi.fetch
      .mockResolvedValueOnce(oldProducts)
      .mockResolvedValueOnce({ create: createdProducts });

    const result = await adapter.replaceAllProducts(newProducts);

    expect(result).toEqual(createdProducts);
    expect(mockApi.fetch).toHaveBeenCalledTimes(2);
    expect(mockApi.fetch).toHaveBeenNthCalledWith(1, 'products');
    expect(mockApi.fetch).toHaveBeenNthCalledWith(2, 'products/batch', {
      method: 'POST',
      body: {
        delete: [],
        create: expect.any(Array),
      },
    });
  });

  it('should handle empty new products list', async () => {
    const oldProducts: Product[] = [
      {
        id: 1,
        name: 'Old Product',
        slug: 'old-product',
        price: '100',
        description: 'Old description',
      },
    ];
    const newProducts: NewProduct[] = [];
    const emptyResponse = { create: [] };

    mockApi.fetch.mockResolvedValueOnce(oldProducts).mockResolvedValueOnce(emptyResponse);

    const result = await adapter.replaceAllProducts(newProducts);

    expect(result).toEqual([]);
    expect(mockApi.fetch).toHaveBeenCalledTimes(2);
    expect(mockApi.fetch).toHaveBeenNthCalledWith(1, 'products');
    expect(mockApi.fetch).toHaveBeenNthCalledWith(2, 'products/batch', {
      method: 'POST',
      body: {
        delete: [1],
        create: [],
      },
    });
  });
});
