import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  productDetailsReducer,
  productReducer,
  createProductReducer,
  myProductReducer,
} from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newProduct: createProductReducer,
  myProduct: myProductReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  initialState,
  // devTools: applyMiddleware(...middleware),
});

export default store;
