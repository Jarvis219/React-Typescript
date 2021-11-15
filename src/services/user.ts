import instance from "./instance";

export const listUserAPI = () => {
  const url = `/users`;
  return instance.get(url);
};
export const readUserAPI = () => {
  const url = `/read-user`;
  return instance.get(url);
};

export const updateUserAPI = (id: string, permission: number) => {
  const url = `/update-user/${id}`;
  return instance.put(url, { permission });
};

export const removeUserAPI = (id: string) => {
  const url = `/remove-user/${id}`;
  return instance.delete(url);
};
