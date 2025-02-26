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
  alt?: string;
}

export interface Application {
  getProduct(slug: string): Promise<Product | null>;
  getProducts(): Promise<Product[]>;
  replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]>;
}
