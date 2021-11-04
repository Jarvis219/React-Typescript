import { ProductModel } from "models/product";
import instance from "./instance";

export const createProductAPI = (data: ProductModel) => {
  const url = "/create-product";
  return instance.post(url, data);
};

export const listProductAPI = () => {
  const url = "/list-product";
  return instance.get(url);
};

export const updateProductAPI = (id: string, data: string) => {
  const url = `/update-product/${id}`;
  return instance.put(url, data);
};

export const removeProductAPI = (id: string) => {
  const url = `/remove-product/${id}`;
  return instance.delete(url);
};
