import React from "react";
import { connect } from "react-redux";
import { MainDiv } from "../../style/Home";

const Home = ({ isAuthenticated, newestRestaurants }) => {
  return (
    <MainDiv>
      <div>
        <h1>Home</h1>
        <h3>
          You can search any type of food you want and it will be delivered to
          your address
        </h3>
      </div>

      <div>
        <h1>Newest restaurants</h1>
      </div>
      <div>
        <h1>Restaurans with best reviews</h1>
      </div>
      <div>
        <h1>Restaurans with most reviews</h1>
      </div>
      <div>
        <h2>Search restaurans by type of dish you like</h2>
      </div>
    </MainDiv>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  newestRestaurants: state.shop.restaurant,
});

export default connect(mapStateToProps)(Home);
