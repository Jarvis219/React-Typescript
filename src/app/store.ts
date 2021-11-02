import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import hobbyReducer from "../features/client/pages/hobbySlice";
import authSlice from "../features/auth/authSlice";
import CategorySlice from "features/admin/pages/Categories/CategorySlice";

const rootReducer = {
  hobbies: hobbyReducer,
  auth: authSlice,
  category: CategorySlice,
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
