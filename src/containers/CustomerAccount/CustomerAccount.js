import React from "react";
import { connect } from "react-redux";
import { MainCustomerDiv } from "./style/CustomerAccountStyle";

const CustomerAccount = ({ data }) => {
  return (
    <MainCustomerDiv>
      <h1>CustomerAccount</h1>
      <h3>{data.email}</h3>
    </MainCustomerDiv>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.user,
});

export default connect(mapStateToProps)(CustomerAccount);
