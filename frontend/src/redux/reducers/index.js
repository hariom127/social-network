import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { postReducer } from "./postReducer";

const reducers = combineReducers({
  auth: authReducer,
  posts: postReducer,
});
export default reducers;
