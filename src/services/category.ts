import { CategoryModel } from "./../models/category";
import instance from "./instance";

export const createCategoryAPI = (data: CategoryModel) => {
  const url = "/create-category";
  return instance.post(url, data);
};

export const listCategoryAPI = () => {
  const url = "/list-category";
  return instance.get(url);
};

export const updateCategoryAPI = (id: string, name: string) => {
  const url = `/update-category/${id}`;
  return instance.put(url, { name });
};

export const removeCategoryAPI = (id: string) => {
  const url = `/remove-category/${id}`;
  return instance.delete(url);
};
