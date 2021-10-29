import Page404 from "features/client/pages/Page404/Page404";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Loading } from "utils/loading/Loading";
const Product = lazy(() => import("./Products/Product"));
const DashboardPage = lazy(() => import("./Dashboard/Dashboard"));
const CreateProduct = lazy(() => import("./Products/CreateProduct"));
const AdminPage = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/admin" component={DashboardPage} />
            <Route exact path="/admin/products" component={Product} />
            <Route
              exact
              path="/admin/create-product"
              component={CreateProduct}
            />
            <Route path="*" component={Page404} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default AdminPage;
