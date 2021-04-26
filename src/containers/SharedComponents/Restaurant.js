import React, { Fragment, useCallback, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  add_to_cart,
  restaurant_detail,
  refresh_cart,
} from "../../actions/shop";
import { MainDiv } from "../../style/Restaurants";

const Restaurant = ({ isAuthenticated, restaurant, loading, cart }) => {
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  console.log(cart);

  useEffect(() => {
    let id = window.location.pathname;
    console.log(id);
    dispatch(restaurant_detail(id));
  }, []);

  const addToCart = (slug) => {
    if (isAuthenticated) {
      dispatch(add_to_cart(slug));
      dispatch(refresh_cart());
    } else {
      console.log("you need to be loged in");
    }
  };

  useEffect(() => {
    dispatch(refresh_cart());
  }, []);

  return (
    <MainDiv>
      {loading ? null : (
        <Fragment>
          <h1>{restaurant.name}</h1>
          <div>
            {restaurant !== undefined &&
              restaurant.item !== undefined &&
              restaurant.item.map((item_detail, index) => {
                return (
                  <Fragment key={index}>
                    <h3>{item_detail.title}</h3>
                    <h4>{item_detail.description}</h4>
                    <h4>{item_detail.price}</h4>
                    <button onClick={() => addToCart(item_detail.slug)}>
                      Add to cart
                    </button>
                  </Fragment>
                );
              })}
          </div>
        </Fragment>
      )}
    </MainDiv>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  restaurant: state.shop.restaurant_detail,
  loading: state.shop.isLoading,
  cart: state.shop.cart,
});

export default connect(mapStateToProps, { restaurant_detail, add_to_cart })(
  Restaurant
);
