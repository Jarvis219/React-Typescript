export interface ProductModel {
  name: string;
  description: string;
  price: number;
  sale: number;
  category: string;
  quantity: number;
  sold?: number;
  photo?: string | File;
  album?: Array<string>;
  status?: 0 | 1 | 2;
}
