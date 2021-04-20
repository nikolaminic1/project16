import React from "react";
import { connect } from "react-redux";
import { MainAccountDiv } from "../../style/Account";
import CustomerAccount from "../CustomerAccount/CustomerAccount";
import Restaurants from "./Restaurants";
import DelivererAccount from "../DelivererDashboard/DelivererAccount";
import GenericAccount from "./GenericAccount";

const Account = ({ userData }) => {
  if (userData.role === "SELLER") {
    return <Restaurants data={userData} />;
  } else if (userData.role === "CUSTOMER") {
    return <CustomerAccount data={userData} />;
  } else if (userData.role === "DELIVERER") {
    return <DelivererAccount data={userData} />;
  } else {
    return <GenericAccount data={userData} />;
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.user,
});

export default connect(mapStateToProps)(Account);
