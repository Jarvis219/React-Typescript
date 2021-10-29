import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page404 from "./Page404";
import { Verify } from "./verify-email/Verify";
import { Loading } from "utils/loading/Loading";
const Home = lazy(() => import("./home/Home"));
const Product = lazy(() => import("./Products/Product"));
const About = lazy(() => import("./About/About"));
const ClientPage = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/product' component={Product} />
            <Route path='/about' component={About} />
            <Route path='/active-email' exact component={Verify} />
            <Route path='*' component={Page404} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};
export default ClientPage;
