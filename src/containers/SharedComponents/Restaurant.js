import React, { Fragment, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { add_to_cart, restaurant_detail } from "../../actions/shop";
import { MainDiv } from "../../style/Restaurants";

const Restaurant = ({ isAuthenticated, restaurant, loading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let id = window.location.pathname;
    console.log(id);
    dispatch(restaurant_detail(id));
  }, []);

  return (
    <MainDiv>
      {loading ? null : (
        <Fragment>
          <h1>{restaurant.name}</h1>
          <div>
            {restaurant !== undefined &&
              restaurant.item !== undefined &&
              restaurant.item.map((item_detail) => {
                return (
                  <Fragment>
                    <h3>{item_detail.title}</h3>
                    <h4>{item_detail.description}</h4>
                    <h4>{item_detail.price}</h4>
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
});

export default connect(mapStateToProps, { restaurant_detail, add_to_cart })(
  Restaurant
);
