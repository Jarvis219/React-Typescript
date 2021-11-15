import { getUser } from "utils/utils";
import { OrderModel } from "../models/order";
import instance from "./instance";
let _id: any;

if (getUser()) {
  _id = getUser()._id;
} else {
  const urlParams = new URLSearchParams(window.location.search);
  _id = urlParams.get("user");
}

export const createOrderAPI = (data: OrderModel) => {
  const url = `/order/${_id}`;
  return instance.post(url, data);
};

export const listOrderAPI = () => {
  const url = `/list-order/${_id}`;
  return instance.get(url);
};

export const updateOrderAPI = (id: string, data: string) => {
  const url = `/update-order/${id}/${_id}`;
  return instance.put(url, data);
};
export const readOrderAPI = (id: string) => {
  const url = `/read-order/${id}/${_id}`;
  return instance.get(url);
};

export const removeOrderAPI = (id: string) => {
  const url = `/remove-order/${id}/${_id}`;
  return instance.delete(url);
};
