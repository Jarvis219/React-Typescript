// import Page404 from "features/client/pages/Page404/Page404";
import { lazy } from 'react';
const Product = lazy(() => import('./pages/Products/Product'));
const Category = lazy(() => import('./pages/Categories/Category'));
const DashboardPage = lazy(() => import('./pages/Dashboard/Dashboard'));
const TrashProduct = lazy(() => import('./pages/Products/TrashProduct'));
const Order = lazy(() => import('./pages/Order/Order'));
const TrashOrder = lazy(() => import('./pages/Order/TrashOrder'));
const CompleteOrder = lazy(() => import('./pages/Order/CompleteOrder'));
const User = lazy(() => import('./pages/User/User'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

const adminLayout = [
	{
		path: '/',
		component: DashboardPage,
		exact: true,
	},
	{
		path: '/dashboard',
		component: DashboardPage,
		exact: true,
	},
	{
		path: '/users',
		component: User,
		exact: true,
	},
	{
		path: '/categories',
		component: Category,
		exact: true,
	},
	{
		path: '/products',
		component: Product,
		exact: true,
	},
	{
		path: '/orders',
		component: Order,
		exact: true,
	},
	{
		path: '/contacts',
		component: Contact,
		exact: true,
	},
	{
		path: '/trash-products',
		component: TrashProduct,
		exact: true,
	},
	{
		path: '/trash-orders',
		component: TrashOrder,
		exact: true,
	},
	{
		path: '/complete-orders',
		component: CompleteOrder,
		exact: true,
	},
];

export default adminLayout;
