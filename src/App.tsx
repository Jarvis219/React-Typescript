import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthProvider from "./helpers/AuthProvider";
import PrivateRoute from "helpers/PrivateRoute";
import PublicRoute from "helpers/PublicRoute";
import { Loading } from "utils/loading/Loading";
import clientLayout from "./features/client/ClientLayout";
import adminLayout from "./features/admin/AdminLayout";
import Page404 from "features/client/pages/Page404/Page404";
import { useAppDispatch } from "app/hook";
import { listCategory } from "features/admin/pages/Categories/CategorySlice";
import { ListProduct } from "features/admin/pages/Products/ProductSlice";
import { ListCartUser } from "features/admin/pages/Cart/CartSlice";
import { getPermission, getUser } from "utils/utils";
import { ListOrder } from "features/admin/pages/Order/OrderSlice";
import { ListUsers } from "features/admin/pages/User/UserSlice";
import { listContact } from "features/admin/pages/Contact/ContactSlice";
const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const auth = getPermission();
    const getOrder = async (): Promise<void> => {
      try {
        await dispatch(ListOrder());
      } catch (error) {
        console.log(error);
      }
    };
    const getCategories = async (): Promise<void> => {
      try {
        await dispatch(listCategory());
      } catch (error) {
        console.log(error);
      }
    };
    const getProducts = async (): Promise<void> => {
      try {
        await dispatch(ListProduct());
      } catch (error) {
        console.log(error);
      }
    };

    const getCartUser = async (): Promise<void> => {
      try {
        if (!getUser()) return;
        sessionStorage.removeItem("total");
        const { _id } = getUser();
        await dispatch(ListCartUser(_id));
      } catch (error) {
        console.log(error);
      }
    };

    const getContacts = async (): Promise<void> => {
      try {
        await dispatch(listContact());
      } catch (error) {
        console.log(error);
      }
    };

    const getUsers = async (): Promise<void> => {
      try {
        if (!getUser()) return;
        await dispatch(ListUsers());
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    getProducts();

    if (auth === 0) {
      getCartUser();
      getOrder();
    }
    if (auth && auth === 1) {
      getUsers();
      getOrder();
      getContacts();
    }
  }, [dispatch]);

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              {adminLayout.map(({ path, component, exact }, index) => {
                return (
                  <PrivateRoute
                    exact={exact}
                    key={index}
                    path={`/admin${path}`}
                    component={component}
                  />
                );
              })}
              {clientLayout.map(({ path, component, exact }, index) => {
                return (
                  <PublicRoute
                    exact={exact}
                    key={index}
                    path={path}
                    component={component}
                  />
                );
              })}
              <Route path="*" exact component={Page404} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
