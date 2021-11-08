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
import { getUser } from "utils/utils";
const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getCategories = async () => {
      try {
        await dispatch(listCategory());
      } catch (error) {
        console.log(error);
      }
    };
    const getProducts = async () => {
      try {
        await dispatch(ListProduct({ limit: 0, skip: 0 }));
      } catch (error) {
        console.log(error);
      }
    };

    const getCartUser = async () => {
      try {
        if (!getUser()) return;
        sessionStorage.removeItem("total");
        const { _id } = getUser();
        await dispatch(ListCartUser(_id));
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    getProducts();
    getCartUser();
  }, [dispatch]);

  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path='/register' exact component={Register} />
              <Route path='/login' exact component={Login} />
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
              <Route path='*' exact component={Page404} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
