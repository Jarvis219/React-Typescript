import { ProductModel } from "./../models/product";
import instance from "./instance";

export const createProductAPI = (data: ProductModel) => {
  const url = "/create-product";
  return instance.post(url, data);
};
