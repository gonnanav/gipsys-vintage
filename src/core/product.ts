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
