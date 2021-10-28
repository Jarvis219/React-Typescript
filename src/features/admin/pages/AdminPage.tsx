import { lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
const Product = lazy(() => import("./Products/Product"));
const AdminPage = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/admin/product" component={Product} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AdminPage;
