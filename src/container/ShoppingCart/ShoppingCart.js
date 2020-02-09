import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import "./ShoppingCart.css";
class ShoppingCart extends Component {
  routeCheckoutPage = () => {
    const path = "/checkout";
    this.props.history.push(path);
  };
  deleteItem = itemId => {
    console.log("itemId :", itemId);
  };
  render() {
    return (
      <div className="container col-md-12 shopping_cart">
        <div className="row">
          <div className="col-md-8">
            <ShoppingList />
          </div>
          <div className="payment_option text-center pt_1 col-md-4">
            <h3>TOTAL: {this.props.totalPrice}</h3>
            <button
              className="secondary_button"
              onClick={this.routeCheckoutPage}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    shoppingList: state.shoppingCart.shoppingList,
    totalPrice: state.shoppingCart.totalPrice
  };
};
export default connect(mapStateToProps)(ShoppingCart);
