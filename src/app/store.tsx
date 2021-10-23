import { configureStore } from "@reduxjs/toolkit";
import hobbyReducer from "../features/pages/hobbySlice";

const rootReducer = {
  hobbies: hobbyReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
