import { ProductModel } from "models/product";
import instance from "./instance";

export const createProductAPI = (data: ProductModel) => {
  const url = "/create-product";
  return instance.post(url, data);
};

export const listProductAPI = (limit?: number, skip?: number) => {
  const url = `/list-product?limit=${limit}&skip=${skip}`;
  return instance.get(url);
};

export const findById = (id: string) => {
  const url = `/read-product/${id}`;
  return instance.get(url);
};

export const listSearchAPI = (name: string) => {
  const url = `/list-search?name=${name}`;
  return instance.get(url);
};

export const filterCategory = (id: string) => {
  const url = `/filter-category?category=${id}`;
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
