export interface ShopPageProduct {
  id: number;
  name: string;
  imageSrc: string;
  href: string;
  price: string;
}

export interface ShopPageProps {
  title: string;
  products: ShopPageProduct[];
}
