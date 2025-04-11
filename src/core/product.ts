export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  images: ProductImage[];
  mainImage?: ProductImage;
}

export interface ProductInput {
  id: number;
  name: string;
  slug: string;
  price: string;
  description?: string;
  images?: ProductImageInput[];
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductImageInput {
  src: string;
  alt: string;
}

export interface ProductCreate {
  name: string;
  price: string;
  description?: string;
  images?: ProductImage[];
  categoryId?: number;
}

export const placeholderImage: ProductImage = {
  src: '/images/product-placeholder.webp',
  alt: 'אין תמונת מוצר',
};

const defaultProductProperties = {
  description: '',
  images: [],
};

export function createProduct(input: ProductInput): Product {
  const mainImage = input.images?.[0] ?? placeholderImage;

  return { ...defaultProductProperties, ...input, mainImage };
}
