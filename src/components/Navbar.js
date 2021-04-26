import React, { Fragment } from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const { Header, Content, Footer } = Layout;

const Navbar = ({ logout, isAuthenticated }) => {
  const authLinks = (
    <Fragment>
      <Menu.Item key="3">
        <NavLink to="/" onClick={logout}>
          Logout
        </NavLink>
      </Menu.Item>
      <Menu.Item key="4">
        <NavLink to="/me">Account</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/order-summary">Order summary</NavLink>
      </Menu.Item>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <Menu.Item key="5">
        <NavLink to="/login">Login</NavLink>
      </Menu.Item>
      <Menu.Item key="6">
        <NavLink to="/signup">SignUp</NavLink>
      </Menu.Item>
    </Fragment>
  );

  return (
    <div>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/restaurants">Restaurants</NavLink>
          </Menu.Item>
          {isAuthenticated ? authLinks : guestLinks}
        </Menu>
      </Header>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
