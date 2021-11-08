import { DataUser } from "models/user";
import { auth } from "firebase";
import { toast } from "react-toastify";

export const notifyError = (error: string) => toast.error(error);
export const notifySuccess = (success: string) =>
  toast.success(success, { icon: "🚀" });

export const setToken = (token: string): void => {
  sessionStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return !sessionStorage.getItem("token")
    ? null
    : sessionStorage.getItem("token")!;
};

export const setUser = (userData: DataUser): void => {
  const data = JSON.stringify(userData);
  sessionStorage.setItem("user", data);
};

export const getUser = (): DataUser => {
  return JSON.parse(sessionStorage.getItem("user")!);
};

export const logout = (): void => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  auth.signOut();
};

export const setRefreshToken = (refreshToken: string): void => {
  sessionStorage.setItem("refreshToken", refreshToken);
};

export const getRefreshToken = (): string | null => {
  return !sessionStorage.getItem("refreshToken")
    ? null
    : sessionStorage.getItem("refreshToken")!;
};

export const getPermission = (): number | null => {
  if (!sessionStorage.getItem("user")) return null;
  return JSON.parse(sessionStorage.getItem("user")!).permission;
};

export const arrayMove = (arr: any, fromIndex: number, toIndex: number = 0) => {
  let array = [...arr];
  let element = arr[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
  return array;
};

export const removeEmptyArray = (array: any): any => {
  const filtered = array.filter(function (el: any) {
    return el != null;
  });
  return filtered;
};

export const setCountProduct = (count: string): void => {
  sessionStorage.setItem("countProduct", count);
};

export const getCountProduct = (): void => {
  if (sessionStorage.getItem("countProduct")) {
    return JSON.parse(sessionStorage.getItem("countProduct")!);
  }
};

export type Pagination = {
  limit: number;
  skip: number;
};

export const getSortText = (text: string): string => {
  if (text.length > 21) {
    return `${text.substr(0, 25)}...`;
  }
  return text;
};

export const sortText = (text: string, start: number, end: number): string => {
  return `${text.substr(start, end)} ...`;
};

export const setTotal = (total: number): void => {
  sessionStorage.setItem("total", total as unknown as string);
};

export const getTotal = (): number => {
  if (!sessionStorage.getItem("total")) return 0;
  return JSON.parse(sessionStorage.getItem("total")!);
};

export const changeDisplayPrices = (
  price: string | number
): string | number => {
  let x = price.toLocaleString("it-IT", {
    style: "currency",
    currency: "USD",
  });
  return x.toString().substring(0, x.length - 7) + " USD";
};

export const setPrice = () => {
  const arr: any = [];
  const price = document.querySelectorAll(".product-price-cart");
  price.forEach((item: any) => {
    arr.push(+item.innerHTML);
  });

  if (arr.length === 0) {
    setTotal(0);
    return;
  }
  const reducer = (previousValue: number, currentValue: number) =>
    previousValue + currentValue;
  setTotal(arr.reduce(reducer));
};
