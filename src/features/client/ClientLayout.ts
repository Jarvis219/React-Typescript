import { lazy } from "react";
import Page404 from "./pages/Page404/Page404";
import { Verify } from "./pages/Verify-email/Verify";
const Home = lazy(() => import("./pages/Home/Home"));
const Product = lazy(() => import("./pages/Products/Product"));
const About = lazy(() => import("./pages/About/About"));
const ProductCategories = lazy(
  () => import("./pages/Products/ProductCategories")
);
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));

const clientLayout = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/product/:id",
    component: Product,
    exact: true,
  },
  {
    path: "/category/:id",
    component: ProductCategories,
    exact: true,
  },
  {
    path: "/about",
    component: About,
    exact: true,
  },
  {
    path: "/check-out",
    component: Checkout,
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
