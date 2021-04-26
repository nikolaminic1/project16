import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { connect, Provider } from "react-redux";
import Home from "./containers/SharedComponents/Home";
import Login from "./containers/SharedComponents/Login";
import Layout from "./containers/SharedComponents/Layout";
import SignUp from "./containers/SharedComponents/SignUp";
import Restaurants from "./containers/SharedComponents/Restaurants";
import Account from "./containers/SharedComponents/Account";
import { AUTHENTICATED_SUCCESS, LOGIN_SUCCESS } from "./actions/types";
import { load_user } from "./actions/auth";
import { PersistGate } from "redux-persist/integration/react";

import { store } from "./store";
import Restaurant from "./containers/SharedComponents/Restaurant";
import OrderSummary from "./containers/SharedComponents/OrderSummary";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/restaurants" component={Restaurants} />
            <Route exact path="/restaurants/:id" component={Restaurant} />
            <Route path="/order-summary" component={OrderSummary} />
            <Route exact path="/:id" component={Account} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
