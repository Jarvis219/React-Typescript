import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import CategorySlice from "features/admin/pages/Categories/CategorySlice";
import ProductSlice from "features/admin/pages/Products/ProductSlice";

const rootReducer = {
  auth: authSlice,
  category: CategorySlice,
  product: ProductSlice,
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
