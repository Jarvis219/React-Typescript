import { ProductModel } from "models/product";
import { getUser } from "utils/utils";
import instance from "./instance";
let _id: any;

if (getUser()) {
  _id = getUser()._id;
} else {
  const urlParams = new URLSearchParams(window.location.search);
  _id = urlParams.get("user");
}

export const createProductAPI = (data: ProductModel) => {
  const url = `/create-product/${_id}`;
  return instance.post(url, data);
};

export const listProductAPI = () => {
  const url = `/list-product`;
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
  const url = `/update-product/${id}/${_id}`;
  return instance.put(url, data);
};

export const removeProductAPI = (id: string) => {
  const url = `/remove-product/${id}/${_id}`;
  return instance.delete(url);
};
