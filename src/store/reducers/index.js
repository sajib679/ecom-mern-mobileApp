import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import productReducer from "./product.reducers";
import cartReducer from "./cart.reducers";
import categoryReducer from "./category.reducers";
import searchReducer from "./search.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  search: searchReducer,
});

export default rootReducer;
