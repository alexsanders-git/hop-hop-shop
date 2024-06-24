import { ICategory } from './ICategory';

export interface ProductImage {
  image: string;
}

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  SKU: number;
  description: string;
  category: ICategory;
  images: ProductImage[];
}
export interface InterfaceProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  SKU: number;
  description: string;
  category: ICategory;
  images: ProductImage[];
}
