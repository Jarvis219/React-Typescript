import { Redirect, Route } from "react-router-dom";
import useAuth from "./useAuth";

const PrivateRoute = ({ ...rest }) => {
  const auth = useAuth();
  if (auth === null) return <Redirect to='/login' />;
  return <Route {...rest} />;
};

export default PrivateRoute;
