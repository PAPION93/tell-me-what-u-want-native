import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import restaurantsReducer from "./restaurantsSlice";

export default combineReducers({
  usersReducer,
  restaurantsReducer,
});
