import { CategoryModel } from "./../models/category";
import instance from "./instance";
import { getUser } from "utils/utils";
let _id: any;

if (getUser()) {
  _id = getUser()._id;
} else {
  const urlParams = new URLSearchParams(window.location.search);
  _id = urlParams.get("user");
}

export const createCategoryAPI = (data: CategoryModel) => {
  const url = `/create-category/${_id}`;
  return instance.post(url, data);
};

export const listCategoryAPI = () => {
  const url = "/list-category";
  return instance.get(url);
};

export const updateCategoryAPI = (id: string, name: string) => {
  const url = `/update-category/${id}/${_id}`;
  return instance.put(url, { name });
};

export const removeCategoryAPI = (id: string) => {
  const url = `/remove-category/${id}/${_id}`;
  return instance.delete(url);
};
