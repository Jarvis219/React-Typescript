import { ProductPagination } from "constants/product";

export interface ProductModel {
  name: string;
  description: string;
  price: number;
  sale: number;
  category: string;
  quantity: number;
  sold?: number;
  photo?: string;
  album?: Array<string>;
  status?: string;
}

export type ProductPaginationType = {
  type: ProductPagination;
};

export type DisabledProductPaginationType = {
  action: string;
  status: boolean;
};

export type NavLink = {
  category: string;
  product: string;
};
