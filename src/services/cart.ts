import { CartModel } from "models/cart";
import instance from "./instance";
import { getUser } from "utils/utils";
let _id: any;

if (getUser()) {
  _id = getUser()._id;
} else {
  const urlParams = new URLSearchParams(window.location.search);
  _id = urlParams.get("user");
}

export const createCartAPI = (data: CartModel) => {
  const url = `/create-cart/${_id}`;
  return instance.post(url, data);
};

export const listCartAPI = () => {
  const url = `/list-cart/${_id}`;
  return instance.get(url);
};

export const listCartUserAPI = (user: string) => {
  const url = `/list-cart/user/${_id}?user=${user}`;
  return instance.get(url);
};

export const updateCartAPI = (id: string, data: CartModel) => {
  const url = `/update-cart/${id}/${_id}`;
  return instance.put(url, data);
};

export const removeCartAPI = (id: string) => {
  const url = `/remove-cart/${id}/${_id}`;
  return instance.delete(url);
};
