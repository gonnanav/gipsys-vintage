export interface NewProduct {
  name: string;
  price: string;
  description?: string;
  images?: ProductImage[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  description?: string;
  images?: ProductImage[];
}

export interface ProductImage {
  src: string;
}

export interface ECommercePort {
  getProduct(slug: string): Promise<Product | null>;
  getProducts(): Promise<Product[]>;
  replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]>;
}

export class Application {
  constructor(private eCommercePort: ECommercePort) {}

  async getProduct(slug: string): Promise<Product | null> {
    return this.eCommercePort.getProduct(slug);
  }

  async getProducts(): Promise<Product[]> {
    return this.eCommercePort.getProducts();
  }

  async replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]> {
    return this.eCommercePort.replaceAllProducts(newProducts);
  }
}
