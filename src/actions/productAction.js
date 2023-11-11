import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  MY_PRODUCT_REQUEST,
  MY_PRODUCT_SUCCESS,
  MY_PRODUCT_FAIL,
} from "../constants/productConstant";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });
    // const { data } = await axios.get("https://glivobackendnew.onrender.com/api/v1/lawyer");
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_DOMAIN_DEV}lawyer`
    );
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getMyProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_PRODUCT_REQUEST,
    });
    // const { data } = await axios.get("https://glivobackendnew.onrender.com/api/v1/lawyer");
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_DOMAIN_DEV}lawyer/my`,
      { withCredentials: true }
    );
    dispatch({
      type: MY_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_DOMAIN_DEV}lawyer/${id}`
    );
    // const { data } = await axios.get(
    //   `https://glivobackendnew.onrender.com/api/v1/lawyer/${id}`
    // );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_DOMAIN_DEV}lawyer/new`,
      product,
      config
    );

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.lawyer });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
