import axios from "axios";
import { ADD_TO_CART,REMOVE_CART_ITEM } from "../constants/cartConstant";

// ADD TO CART
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://glivobackendnew.onrender.com/api/v1/lawyer/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.lawyer._id,
      name: data.lawyer.name,
      price: data.lawyer.price,
      image: data.lawyer.images.url,
      stock: data.lawyer.supply,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
