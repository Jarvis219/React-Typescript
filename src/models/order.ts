export interface OrderModel {
  name: string;
  email: string;
  address: string;
  note?: string;
  phone: string;
  product: Object;
  price: number;
  pay: string;
  status?: string;
}
