import { NewProduct, ProductImage } from '@/application'; // Adjust the import path as necessary

export class WooCommerceNewProduct {
  name: string;
  regular_price: string;
  description?: string;
  images?: ProductImage[];

  constructor(newProduct: NewProduct) {
    this.name = newProduct.name;
    this.regular_price = newProduct.price;
    this.description = newProduct.description;
    this.images = newProduct.images;
  }

  static fromDomain(products: NewProduct[]): WooCommerceNewProduct[] {
    return products.map((product) => new WooCommerceNewProduct(product));
  }
}
