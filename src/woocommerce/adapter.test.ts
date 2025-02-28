import { Product, ProductCreate } from '@/core/product';
import { WooCommerceApi } from './api';
import { WooCommerceAdapter } from './adapter';
import { WooCommerceProduct, WooCommerceProductInput } from './product';
import { WooCommerceCategory, WooCommerceCategoryInput } from './category';
import { CategoryCreate } from '@/core/category';

let api: jest.Mocked<WooCommerceApi>;
let adapter: WooCommerceAdapter;

beforeEach(() => {
  api = {
    getProducts: jest.fn().mockResolvedValue([]),
    batchUpdateProducts: jest.fn().mockResolvedValue({}),
    getCategories: jest.fn().mockResolvedValue([]),
    batchUpdateCategories: jest.fn().mockResolvedValue({}),
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
        categories: [],
      },
      {
        id: 2,
        name: 'Test Product 2',
        regular_price: '200',
        slug,
        description: '',
        images: [],
        categories: [],
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
        categories: [],
      },
      {
        id: 2,
        name: 'Product 2',
        slug: 'product-2',
        regular_price: '200',
        description: 'Description 2',
        images: [],
        categories: [],
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
        categories: [],
      },
      {
        id: 2,
        name: 'Product 2',
        slug: 'product-2',
        regular_price: '200',
        description: '',
        images: [],
        categories: [],
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

describe('replaceAllCategories', () => {
  it('calls api batchUpdateCategories to delete existing categories', async () => {
    const existingWcCategories: WooCommerceCategory[] = [
      { id: 1, slug: 'category-1', name: 'Category 1' },
      { id: 2, slug: 'category-2', name: 'Category 2' },
    ];

    api.getCategories.mockResolvedValue(existingWcCategories);
    await adapter.replaceAllCategories([]);

    expect(api.batchUpdateCategories).toHaveBeenNthCalledWith(1, {
      delete: [1, 2],
    });
  });

  it('calls api batchUpdateCategories to create new categories', async () => {
    const existingWcCategories: WooCommerceCategory[] = [];
    const newCategories: CategoryCreate[] = [
      { name: 'New Category 1' },
      { name: 'New Category 2' },
    ];
    const newWcCategories: WooCommerceCategoryInput[] = [
      { name: 'New Category 1' },
      { name: 'New Category 2' },
    ];

    api.getCategories.mockResolvedValue(existingWcCategories);
    await adapter.replaceAllCategories(newCategories);

    expect(api.batchUpdateCategories).toHaveBeenNthCalledWith(2, {
      create: newWcCategories,
    });
  });
});
