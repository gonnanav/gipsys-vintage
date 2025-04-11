export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  images: ProductImage[];
  categoryId: number;
}

export interface ProductImage {
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
