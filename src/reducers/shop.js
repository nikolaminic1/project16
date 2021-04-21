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
} from "../actions/types";

const shopInitialState = {
  restaurant: [],
  isLoading: false,
  restaurant_detail: {},
};

export default function (state = shopInitialState, action) {
  const { type, payload } = action;

  switch (type) {
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
    default:
      return {
        ...state,
      };
  }
}
