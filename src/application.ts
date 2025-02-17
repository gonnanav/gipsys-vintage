export interface NewProduct {
  name: string;
  price: string;
  images?: ProductImage[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  images?: ProductImage[];
}

export interface ProductImage {
  src: string;
}

export interface ECommercePort {
  getProducts(): Promise<Product[]>;
  replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]>;
}

export class Application {
  constructor(private eCommercePort: ECommercePort) {}

  async getProducts(): Promise<Product[]> {
    return this.eCommercePort.getProducts();
  }

  async replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]> {
    return this.eCommercePort.replaceAllProducts(newProducts);
  }
}
