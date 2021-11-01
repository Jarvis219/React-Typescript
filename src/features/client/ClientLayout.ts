import { lazy } from "react";
import HomeTest from "./pages/Home";
import Page404 from "./pages/Page404/Page404";
import { Verify } from "./pages/verify-email/Verify";
const Home = lazy(() => import("./pages/Home/Home"));
const Product = lazy(() => import("./pages/Products/Product"));
const About = lazy(() => import("./pages/About/About"));

const clientLayout = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/test",
    component: HomeTest,
    exact: true,
  },
  {
    path: "/product",
    component: Product,
    exact: true,
  },
  {
    path: "/about",
    component: About,
    exact: true,
  },
  {
    path: "/active-email",
    component: Verify,
    exact: true,
  },
  {
    path: "*",
    component: Page404,
    exact: true,
  },
];

export default clientLayout;
