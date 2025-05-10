import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterReducer";
import ProductReducer from "../../pages/products/redux/reducer/productSlice";
// import authReducer from "./authReducer";
// import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  product: ProductReducer,
  //   auth: authReducer,
  //   profile: profileReducer,
});

export default rootReducer;
