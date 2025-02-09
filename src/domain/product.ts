export interface NewProduct {
  name: string;
}

export interface Product extends NewProduct {
  id: number;
}
