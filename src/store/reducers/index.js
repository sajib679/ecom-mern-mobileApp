import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import productReducer from "./product.reducers";
import cartReducer from "./cart.reducers";
import categoryReducer from "./category.reducers";
import searchReducer from "./search.reducers";
import bannerReducer from "./banner.reducer";
import initDataReducer from "./initialdata.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  initData: initDataReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  search: searchReducer,
  banner: bannerReducer,
});

export default rootReducer;
