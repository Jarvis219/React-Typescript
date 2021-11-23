import { lazy } from "react";
import Contact from "./pages/Contact/Contact";
import Page404 from "./pages/Page404/Page404";
import { Verify } from "./pages/Verify-email/Verify";
const Home = lazy(() => import("./pages/Home/Home"));
const Product = lazy(() => import("./pages/Products/Product"));
const ProductCategories = lazy(
  () => import("./pages/Products/ProductCategories")
);
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const ProductViewCheck = lazy(
  () => import("./pages/Products/ProductViewCheck")
);
const Order = lazy(() => import("./pages/Order/Order"));

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
    path: "/contact",
    component: Contact,
    exact: true,
  },
  {
    path: "/order",
    component: Order,
    exact: true,
  },
  {
    path: "/check-out",
    component: Checkout,
    exact: true,
  },

  {
    path: "/product-view-check/:id",
    component: ProductViewCheck,
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
