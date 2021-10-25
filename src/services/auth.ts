import instance from "./instance";
import { RegisterData, LoginData } from "../models/user";
export const register = (user: RegisterData) => {
  const url = "/register";
  return instance.post(url, user);
};

export const login = (user: LoginData) => {
  const url = "/login";
  return instance.post(url, user);
};

export const Verify = (token: string) => {
  const url = `/verify-email?token=${token}`;
  return instance.get(url);
};

export const loginWithGoogleAccount = (user: any) => {
  const url = `login-google`;
  return instance.post(url, user);
};
