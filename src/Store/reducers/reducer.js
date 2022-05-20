import shopReducer from "./shopReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
const reducer = combineReducers({
  shop: shopReducer,
  auth: authReducer,
});
export default reducer;
