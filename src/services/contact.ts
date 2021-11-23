import { ContactModel } from "./../models/Contact";
import instance from "./instance";
import { getUser } from "utils/utils";
let _id: any;

if (getUser()) {
  _id = getUser()._id;
} else {
  const urlParams = new URLSearchParams(window.location.search);
  _id = urlParams.get("user");
}

export const createContactAPI = (data: ContactModel) => {
  const url = `/create-contact/${_id}`;
  return instance.post(url, data);
};

export const listContactAPI = () => {
  const url = "/list-contact";
  return instance.get(url);
};

export const updateContactAPI = (id: string, data: ContactModel) => {
  const url = `/update-contact/${id}/${_id}`;
  return instance.put(url, data);
};

export const removeContactAPI = (id: string) => {
  const url = `/remove-contact/${id}/${_id}`;
  return instance.delete(url);
};
