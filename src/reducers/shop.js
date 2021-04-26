import {
  RESTAURANT_LOADING,
  RESTAURANT_LOADED_SUCCESS,
  RESTAURANT_LOADED_FAIL,
  RESTAURANT_ITEM_LOADING,
  RESTAURANT_ITEM_LOADED_SUCCESS,
  RESTAURANT_ITEM_LOADED_FAIL,
  RESTAURANT_DETAIL_LOADED_SUCCESS,
  RESTAURANT_DETAIL_LOADED_FAIL,
  RESTAURANT_DETAIL_LOADING,
  REFRESH_CART_LOADING,
  REFRESH_CART_SUCCESS,
  REFRESH_CART_FAIL,
} from "../actions/types";

const shopInitialState = {
  restaurant: [],
  isLoading: false,
  restaurant_detail: {},
  cart: {},
};

export default function (state = shopInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REFRESH_CART_LOADING:
    case RESTAURANT_LOADING:
    case RESTAURANT_DETAIL_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case RESTAURANT_LOADED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurant: payload,
      };
    case REFRESH_CART_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case RESTAURANT_LOADED_FAIL:
    case RESTAURANT_DETAIL_LOADED_FAIL:
      return {
        ...state,
        isLoading: false,
        restaurant: [],
        restaurant_detail: {},
      };
    case RESTAURANT_DETAIL_LOADED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurant_detail: payload,
      };
    case REFRESH_CART_SUCCESS:
      return {
        ...state,
        cart: payload,
        isLoading: false,
      };

    default:
      return {
        ...state,
      };
  }
}
