import { lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Home from "./Home";
const Home = lazy(() => import("./Home/Home"));
const Product = lazy(() => import("./Products/Product"));
const About = lazy(() => import("./About/About"));
const ClientPage = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product" component={Product} />
          <Route path="/about" component={About} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default ClientPage;
