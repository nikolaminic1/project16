import axios from "axios";
import { restaurantsURL, addToCartURL } from "./urls";
import { configAxios, authAxios } from "./config";
import {
  RESTAURANT_LOADING,
  RESTAURANT_LOADED_SUCCESS,
  RESTAURANT_LOADED_FAIL,
  RESTAURANT_ITEM_LOADING,
  RESTAURANT_ITEM_LOADED_SUCCESS,
  RESTAURANT_ITEM_LOADED_FAIL,
  ADD_TO_CART_LOADING,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  RESTAURANT_DETAIL_LOADING,
  RESTAURANT_DETAIL_LOADED_SUCCESS,
  RESTAURANT_DETAIL_LOADED_FAIL,
} from "./types";

export const list_of_restaurants = () => async (dispatch) => {
  dispatch({
    type: RESTAURANT_LOADING,
  });
  try {
    const res = await configAxios.get(restaurantsURL);
    console.log(res);
    dispatch({
      type: RESTAURANT_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: RESTAURANT_LOADED_FAIL,
    });
  }
};

export const restaurant_detail = (id) => async (dispatch) => {
  const restaurant_detail_url = `http://localhost:8000/api${id}/`;
  console.log(restaurant_detail_url);
  dispatch({ type: RESTAURANT_DETAIL_LOADING });
  try {
    const res = await axios.get(restaurant_detail_url);
    console.log(res);
    dispatch({
      type: RESTAURANT_DETAIL_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: RESTAURANT_DETAIL_LOADED_FAIL,
    });
  }
};

export const add_to_cart = (slug) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART_LOADING });
  console.log(localStorage.getItem("access"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const data = { slug: slug };
  try {
    const res = await axios.post(addToCartURL, data, config);
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: ADD_TO_CART_FAIL });
    console.log(err);
  }
};
