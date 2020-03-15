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
import Checkout from "./container/Checkout/Checkout";
import Payment from "./container/Payment/Payment";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("idToken");
    if (token) {
      console.log("check token");
      this.props.getUserData();
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/ref/:productId" component={ProductDetails} />
        <Route path="/products" component={Products} />
        <Route path="/shoppingCart" component={ShoppingCart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/payment" component={Payment} />
        <Route path="/" exact component={Homepage} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/account" component={Account} />
          <Route path="/products/ref/:productId" component={ProductDetails} />
          <Route path="/products" component={Products} />
          <Route path="/shoppingCart" component={ShoppingCart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment" component={Payment} />
          <Route path="/" exact component={Homepage} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <Layout isAuthenticated={this.props.isAuthenticated}>{routes}</Layout>
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
    getUserData: () => dispatch(actions.getAuthenticatedUserData())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
