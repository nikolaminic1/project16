import {
  RESTAURANT_LOADING,
  RESTAURANT_LOADED_SUCCESS,
  RESTAURANT_LOADED_FAIL,
  RESTAURANT_ITEM_LOADING,
  RESTAURANT_ITEM_LOADED_SUCCESS,
  RESTAURANT_ITEM_LOADED_FAIL,
} from "../actions/types";

const shopInitialState = {
  restaurant: [],
  isLoading: false,
};

export default function (state = shopInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESTAURANT_LOADING:
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
      return {
        ...state,
        isLoading: false,
        restaurant: [],
      };
    default:
      return {
        ...state,
      };
  }
}
