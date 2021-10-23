import hobbyReducer from "./hobby";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  hobby: hobbyReducer,
});

export default rootReducer;
