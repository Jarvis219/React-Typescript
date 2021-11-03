// import Page404 from "features/client/pages/Page404/Page404";
import { lazy } from "react";
const Product = lazy(() => import("./pages/Products/Product"));
const Category = lazy(() => import("./pages/Categories/Category"));
const DashboardPage = lazy(() => import("./pages/Dashboard/Dashboard"));

const adminLayout = [
  {
    path: "/",
    component: DashboardPage,
    exact: true,
  },
  {
    path: "/categories",
    component: Category,
    exact: true,
  },
  {
    path: "/products",
    component: Product,
    exact: true,
  },
];

export default adminLayout;
