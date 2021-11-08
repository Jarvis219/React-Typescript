import { OrderModel } from "../models/order";
import instance from "./instance";

export const createOrderAPI = (data: OrderModel) => {
  const url = "/order";
  return instance.post(url, data);
};

export const listOrderAPI = (limit?: number, skip?: number) => {
  const url = `/list-order?limit=${limit}&skip=${skip}`;
  return instance.get(url);
};

export const updateOrderAPI = (id: string, data: string) => {
  const url = `/update-order/${id}`;
  return instance.put(url, data);
};

export const removeOrderAPI = (id: string) => {
  const url = `/remove-order/${id}`;
  return instance.delete(url);
};
