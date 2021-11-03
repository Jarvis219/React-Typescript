import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthProvider from "./helpers/AuthProvider";
import PrivateRoute from "helpers/PrivateRoute";
import { Loading } from "utils/loading/Loading";
import clientLayout from "./features/client/ClientLayout";
import adminLayout from "./features/admin/AdminLayout";
import Page404 from "features/client/pages/Page404/Page404";
import { useAppDispatch } from "app/hook";
import { listCategory } from "features/admin/pages/Categories/CategorySlice";
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
    getCategories();
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
                  <Route
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
