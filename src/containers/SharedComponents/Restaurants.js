import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { MainDiv } from "../../style/Restaurants";
import { list_of_restaurants, add_to_cart } from "../../actions/shop";
import { Modal, Button } from "antd";

const Restaurants = ({ isAuthenticated, newestRestaurants, loading }) => {
  const dispatch = useDispatch();
  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
    dispatch(list_of_restaurants());
    console.log("dispatch");
  }, [isOk, dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const addToCart = (slug) => {
    if (isAuthenticated) {
      dispatch(add_to_cart(slug));
    } else {
      console.log("you need to be loged in");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    console.log("asdasd");
  };

  function getPosition() {
    function succes(pos) {
      let crd = pos.coords;
      console.log(crd);
    }
    window.navigator.geolocation.getCurrentPosition(succes);
  }

  console.log(loading);
  return (
    <MainDiv>
      <h1>Restaurants</h1>
      <button onClick={() => getPosition()}>Get position</button>
      {loading && (
        <Fragment>
          <h3>Loading</h3>
        </Fragment>
      )}
      {newestRestaurants !== undefined &&
        newestRestaurants.map((restaurant) => {
          return (
            <div>
              <h1>{restaurant.name}</h1>
              {restaurant.item !== undefined &&
                restaurant.item.map((item) => {
                  return (
                    <div>
                      <h3>{item.title}</h3>
                      <h4>{item.description}</h4>
                      <h4>{item.price}</h4>
                      <button onClick={() => addToCart(item.slug)}>
                        Add to cart
                      </button>
                    </div>
                  );
                })}
            </div>
          );
        })}
      <div>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </MainDiv>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  newestRestaurants: state.shop.restaurant,
  loading: state.shop.isLoading,
});

export default connect(mapStateToProps, { list_of_restaurants, add_to_cart })(
  Restaurants
);
