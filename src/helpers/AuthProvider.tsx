import { createContext } from "react";
import { getToken } from "../utils/utils";

export const AuthContext = createContext<string | null>(null);

const AuthProvider = ({ children }: any) => {
  let auth = getToken();
  console.log(auth);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
