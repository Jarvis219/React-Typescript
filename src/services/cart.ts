import { CartModel } from "models/cart";
import instance from "./instance";

export const createCartAPI = (data: CartModel) => {
  const url = "/create-cart";
  return instance.post(url, data);
};

export const listCartAPI = (limit?: number, skip?: number) => {
  const url = `/list-cart?limit=${limit}&skip=${skip}`;
  return instance.get(url);
};

export const listCartUserAPI = (user: string) => {
  const url = `/list-cart/user?user=${user}`;
  return instance.get(url);
};

export const updateCartAPI = (id: string, data: CartModel) => {
  const url = `/update-cart/${id}`;
  return instance.put(url, data);
};

export const removeCartAPI = (id: string) => {
  const url = `/remove-cart/${id}`;
  return instance.delete(url);
};
