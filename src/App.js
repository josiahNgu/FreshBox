import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Homepage from "./container/Homepage/Homepage";
import { connect } from "react-redux";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Auth from "./container/Auth/Auth";
import Products from "./container/Products/Products";
import Signup from "./container/Auth/Signup/Signup";
import ShoppingCart from "./container/ShoppingCart/ShoppingCart";
import Account from "./container/Account/Account";
import * as actions from "./store/actions/index";
class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    };
  }
  componentDidMount() {
    this.checkAuthStatus();
  }

  checkAuthStatus = () => {
    if (localStorage.getItem("idToken") !== null) {
      this.setState({
        isAuthenticated: true
      });
    }
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/signup" component={Signup} />
        <Route path="/products" component={Products} />
        <Route path="/" exact component={Homepage} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.state.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/products" component={Products} />
          <Route path="/account" component={Account} />
          <Route path="/shoppingCart" component={ShoppingCart} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <Layout isAuthenticated={this.state.isAuthenticated}>{routes}</Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeAuthenticationStatus: status =>
      dispatch(actions.authenticationStatus(status)),
    updateUserReducer: user => dispatch(actions.loginSuccess(user))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
