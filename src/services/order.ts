import { OrderModel } from "../models/order";
import instance from "./instance";

export const createOrderAPI = (data: OrderModel) => {
  const url = "/order";
  return instance.post(url, data);
};
