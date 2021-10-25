import { configureStore } from "@reduxjs/toolkit";
import hobbyReducer from "../features/pages/hobbySlice";
import authSlice from "../features/auth/authSlice";

const rootReducer = {
  hobbies: hobbyReducer,
  auth: authSlice,
};
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
