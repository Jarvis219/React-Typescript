import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import CategorySlice from "features/admin/pages/Categories/CategorySlice";
import ProductSlice from "features/admin/pages/Products/ProductSlice";
import CartSlice from "features/admin/pages/Cart/CartSlice";
import OrderSlice from "features/admin/pages/Order/OrderSlice";

const rootReducer = {
  auth: authSlice,
  category: CategorySlice,
  product: ProductSlice,
  cart: CartSlice,
  order: OrderSlice,
};
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
