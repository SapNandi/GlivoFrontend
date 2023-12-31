import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "./../constants/orderConstant";

import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_DOMAIN_DEV}order/new`,
      order,
      config
    );
    // const { data } = await axios.post(
    //   "https://glivobackendnew.onrender.com/api/v1/order/new",
    //   order,
    //   config
    // );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get(`${import.meta.env.VITE_API_DOMAIN_DEV}orders/me`, {
      withCredentials: true,
    });
    // const { data } = await axios.get(
    //   "https://glivobackendnew.onrender.com/api/v1/orders/me",
    //   { withCredentials: true }
    // );

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    // const { data } = await axios.get(
    //   `https://glivobackendnew.onrender.com/api/v1/order/${id}`,
    //   {
    //     withCredentials: true,
    //   }
    // );
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_DOMAIN_DEV}order/${id}`,
      {
        withCredentials: true,
      }   
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
