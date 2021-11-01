import { createContext } from "react";
import { getPermission } from "../utils/utils";

export const AuthContext = createContext<number | null>(null);

const AuthProvider = ({ children }: any) => {
  let auth = getPermission();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
