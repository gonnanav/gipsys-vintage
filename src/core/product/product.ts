export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  formattedPrice: string;
  description: string;
  images: ProductImage[];
  mainImage: ProductImage;
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

export function createProduct(input: ProductInput): Product {
  const mainImage = getMainImage(input.images);
  const formattedPrice = formatPrice(input.price);

  return { description: '', images: [], ...input, mainImage, formattedPrice };
}

function getMainImage(images?: ProductImageInput[]): ProductImage {
  return images?.[0] ?? placeholderImage;
}

function formatPrice(price: string): string {
  return `₪${price}`;
}
