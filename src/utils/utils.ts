import { DataUser } from "models/user";
import { auth } from "firebase";
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

export const getUser = (): void => {
  return JSON.parse(sessionStorage.getItem("user")!);
};

export const logout = (): void => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  auth.signOut();
};
// logout();

export const setRefreshToken = (refreshToken: string): void => {
  sessionStorage.setItem("refreshToken", refreshToken);
};

export const getRefreshToken = (): string | null => {
  return !sessionStorage.getItem("refreshToken")
    ? null
    : sessionStorage.getItem("refreshToken")!;
};
